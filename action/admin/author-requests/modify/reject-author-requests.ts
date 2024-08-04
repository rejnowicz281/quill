"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import authorize from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

export default async function rejectAuthorRequest(requestId: string) {
    const actionName = "rejectAuthorRequest";

    if (!authorize("ADMIN"))
        return actionError(actionName, { message: "You are not authorized to reject author requests" });

    await query(
        `
        UPDATE author_requests
        SET status = 'REJECTED'
        WHERE id = $1
    `,
        [requestId]
    );

    return actionSuccess(actionName, {}, { revalidatePath: "/admin" });
}
