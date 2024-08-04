"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import authorize from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

export default async function approveAuthorRequest(requestId: string, userId: string) {
    const actionName = "approveAuthorRequest";

    if (!authorize("ADMIN"))
        return actionError(actionName, { message: "You are not authorized to approve author requests" });

    await Promise.all([
        query(
            `
        UPDATE author_requests
        SET status = 'ACCEPTED'
        WHERE id = $1
    `,
            [requestId]
        ),
        query(
            `
        UPDATE users_roles
        SET role_id = (SELECT id FROM roles WHERE name = 'ROLE_AUTHOR')
        WHERE user_id = $1
        `,
            [userId]
        )
    ]);

    return actionSuccess(actionName, {}, { revalidatePath: "/admin" });
}
