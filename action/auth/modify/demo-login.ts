"use server";

import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import query from "@/lib/utils/db";
import redis from "@/lib/utils/db/redis";
import { loginGenericError } from "./login";

export default async function demoLogin() {
    const actionName = "demoLogin";

    const user = await query("SELECT id, name, email, created_at, avatar_url, password FROM users WHERE email = $1", [
        "demo@demo.demo"
    ]);

    if (!user.rowCount || !user.rows[0].password) return loginGenericError();

    const role = await query(
        `
    SELECT roles.name
    FROM users_roles
    JOIN roles ON users_roles.role_id = roles.id
    WHERE user_id = $1
`,
        [user.rows[0].id]
    );

    await generateSignedToken(
        {
            id: user.rows[0].id,
            name: user.rows[0].name,
            created_at: user.rows[0].created_at,
            role: role.rows[0].name,
            avatar_url: user.rows[0].avatar_url,
            version: (await redis.get(`userTokenVersion:${user.rows[0].id}`)) || 0
        },
        user.rows[0].email
    );

    return actionSuccess(actionName, {}, { redirectPath: "/" });
}
