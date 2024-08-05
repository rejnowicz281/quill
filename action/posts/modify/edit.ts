"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import postSchema from "@/lib/utils/forms/post/schema";

export default async function editPost(formData: FormData, postId: string) {
    const actionName = "editPost";

    const { data, error } = postSchema.safeParse(Object.fromEntries(formData));

    if (error) return actionError(actionName, { message: error.message });

    const { title, content } = data;

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to edit a post" });

    if (currentUser.role !== "ROLE_ROOT") {
        const post = await query(
            `
        SELECT author_id FROM posts
        WHERE id = $1
    `,
            [postId]
        );

        if (currentUser.id !== post.rows[0].author_id)
            return actionError(actionName, { message: "You can't edit another user's post" });
    }

    await query(
        `
        UPDATE posts
        SET (title, content) = ($1, $2)
        WHERE id = $3
    `,
        [title, content, postId]
    );

    return actionSuccess(actionName, {}, { revalidatePath: `/posts/${postId}` });
}
