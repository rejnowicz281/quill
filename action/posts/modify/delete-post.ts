"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";

export default async function deletePost(postId: string) {
    const actionName = "deletePost";

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to delete a post" });

    if (currentUser.role !== "ROLE_ROOT" && currentUser.role !== "ROLE_ADMIN") {
        const post = await query(
            `
        SELECT author_id FROM posts
        WHERE id = $1
    `,
            [postId]
        );

        if (currentUser.id !== post.rows[0].author_id)
            return actionError(actionName, { message: "You can't delete another user's post" });
    }

    await query(
        `
        DELETE FROM comments
        WHERE post_id = $1
    `,
        [postId]
    );

    await query(
        `
        DELETE FROM posts
        WHERE id = $1
    `,
        [postId]
    );

    return actionSuccess(actionName, {}, { redirectPath: "/posts" });
}
