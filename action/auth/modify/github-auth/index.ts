"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import query from "@/lib/utils/db";
import extractUser from "./extract-user";
import insertUser from "./insert-user";

export default async function githubAuth(code?: string) {
    const actionName = "githubAuth";

    if (!code) return actionError(actionName, { message: "Error: No code provided" });

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        })
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) return actionError(actionName, { message: "Error: Failed to get access token from GitHub" });

    const [userResponse, emailResponse] = await Promise.all([
        await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json"
            }
        }),
        await fetch("https://api.github.com/user/emails", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json"
            }
        })
    ]);

    if (!userResponse.ok || !emailResponse.ok)
        return actionError(actionName, { message: "Error: Failed to fetch user info from GitHub" });

    const [userData, emailData] = await Promise.all([userResponse.json(), emailResponse.json()]);

    const exists = await query("SELECT * FROM users WHERE email = $1", [emailData[0].email]);

    if (exists.rowCount) {
        const existingUser = exists.rows[0];

        const role = await query(
            `
                    SELECT roles.name
                    FROM users_roles
                    JOIN roles ON users_roles.role_id = roles.id
                    WHERE users_roles.user_id = $1
                `,
            [existingUser.id]
        );

        const token = await generateSignedToken(
            {
                id: existingUser.id,
                name: existingUser.name,
                created_at: existingUser.created_at,
                role: role.rows[0].name,
                avatar_url: existingUser.avatar_url
            },
            existingUser.email
        );

        return actionSuccess(actionName, { token }, { redirectPath: "/" });
    }

    const user = extractUser({ ...userData, email: emailData[0].email });

    await insertUser(user);

    const token = await generateSignedToken(
        {
            id: user.id,
            name: user.name,
            created_at: user.created_at,
            role: user.role,
            avatar_url: user.avatar_url
        },
        user.email
    );

    return actionSuccess(actionName, { token }, { redirectPath: "/" });
}
