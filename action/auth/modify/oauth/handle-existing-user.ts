import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import query from "@/lib/utils/db";
import { QueryResultRow } from "pg";

export default async function handleExistingUser(actionName: string, user: QueryResultRow) {
    const role = await query(
        `
                SELECT roles.name
                FROM users_roles
                JOIN roles ON users_roles.role_id = roles.id
                WHERE users_roles.user_id = $1
            `,
        [user.id]
    );

    const token = await generateSignedToken(
        {
            id: user.id,
            name: user.name,
            created_at: user.created_at,
            role: role.rows[0].name,
            avatar_url: user.avatar_url
        },
        user.email
    );

    return actionSuccess(actionName, { token }, { redirectPath: "/" });
}
