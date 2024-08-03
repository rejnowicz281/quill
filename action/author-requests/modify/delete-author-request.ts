"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";

export default async function deleteAuthorRequest(requestId: string) {
    const actionName = "deleteAuthorRequest";

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to delete an author request" });

    if (currentUser.role !== "ROLE_ROOT" && currentUser.role !== "ROLE_ADMIN") {
        const request = await query(
            `
        SELECT user_id FROM author_requests
        WHERE id = $1
    `,
            [requestId]
        );

        if (currentUser.id !== request.rows[0].user_id)
            return actionError(actionName, { message: "You can't delete another user's author request" });
    }

    await query(
        `
        DELETE FROM author_requests
        WHERE id = $1
    `,
        [requestId]
    );

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
}
