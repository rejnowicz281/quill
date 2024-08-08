"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import authorize from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

export default async function revokeAuthorPrivileges(userId: string) {
    const actionName = "revokeAuthorPrivileges";

    if (!authorize("ADMIN"))
        return actionError(actionName, { message: "You are not authorized to revoke author privileges" });

    await query(
        `
        UPDATE users_roles
        SET role_id = (SELECT id FROM roles WHERE name = 'ROLE_USER')
        WHERE user_id = $1
        `,
        [userId]
    );

    return actionSuccess(actionName, {}, { revalidatePath: "/admin" });
}
