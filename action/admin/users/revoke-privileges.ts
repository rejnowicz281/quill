"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import { isAdmin } from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";
import redis from "@/lib/utils/db/redis";

export default async function revokeUserPrivileges(userId: string) {
    const actionName = "revokeAuthorPrivileges";

    if (!(await isAdmin()))
        return actionError(actionName, { message: "You are not authorized to revoke a user's privileges" });

    await Promise.all([
        query(
            `
        UPDATE users_roles
        SET role_id = (SELECT id FROM roles WHERE name = 'ROLE_USER')
        WHERE user_id = $1
        `,
            [userId]
        ),
        redis.incr(`userTokenVersion:${userId}`)
    ]);

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
}
