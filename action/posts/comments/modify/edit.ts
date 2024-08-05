"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import commentSchema from "@/lib/utils/forms/schemas/comment-schema";

export default async function editComment(formData: FormData, commentId: string, postId: string) {
    const actionName = "editComment";

    const { data, error } = commentSchema.safeParse(Object.fromEntries(formData));

    if (error) return actionError(actionName, { message: error.message });

    const { content } = data;

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to edit a comment" });

    if (currentUser.role !== "ROLE_ROOT") {
        const comment = await query(
            `
        SELECT user_id FROM comments
        WHERE id = $1
    `,
            [commentId]
        );

        if (currentUser.id !== comment.rows[0].user_id)
            return actionError(actionName, { message: "You can't edit another user's comment" });
    }

    await query(
        `
        UPDATE comments
        SET content = $1
        WHERE id = $2
    `,
        [content, commentId]
    );

    return actionSuccess(actionName, {}, { revalidatePath: `/posts/${postId}` });
}
