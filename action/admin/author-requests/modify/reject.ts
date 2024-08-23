"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import { isAdmin } from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";
import redis from "@/lib/utils/db/redis";

export default async function rejectAuthorRequest(requestId: string, userId: string) {
    const actionName = "rejectAuthorRequest";

    if (!(await isAdmin()))
        return actionError(actionName, { message: "You are not authorized to reject author requests" });

    Promise.all([
        query(
            `
        UPDATE author_requests
        SET status = 'REJECTED'
        WHERE id = $1
    `,
            [requestId]
        ),
        redis.incr(`userTokenVersion:${userId}`)
    ]);

    return actionSuccess(actionName, {}, { revalidatePath: "/admin" });
}
