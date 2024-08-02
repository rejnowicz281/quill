"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";

export default async function deleteComment(commentId: string, postId: string) {
    const actionName = "deleteComment";

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to delete a comment" });

    if (currentUser.role !== "ROLE_ROOT" && currentUser.role !== "ROLE_ADMIN") {
        const comment = await query(
            `
        SELECT user_id FROM comments
        WHERE id = $1
    `,
            [commentId]
        );

        if (currentUser.id !== comment.rows[0].user_id)
            return actionError(actionName, { message: "You can't delete another user's comment" });
    }

    await query(
        `
        DELETE FROM comments
        WHERE id = $1
    `,
        [commentId]
    );

    return actionSuccess(actionName, {}, { revalidatePath: `/posts/${postId}` });
}
