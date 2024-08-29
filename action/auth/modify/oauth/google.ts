"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import query from "@/lib/utils/db";
import { redirect } from "next/navigation";
import extractUser from "./extract-user";
import handleExistingUser from "./handle-existing-user";
import insertUser from "./insert-user";

export async function googleRedirect() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const redirectURI = process.env.GOOGLE_REDIRECT_URI;
    const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const accessType = "offline";
    const responseType = "code";

    redirect(
        `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`
    );
}

export default async function googleAuth(code?: string) {
    const actionName = "googleAuth";

    if (!code) return actionError(actionName, { message: "Error: No code provided" });

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: process.env.GOOGLE_REDIRECT_URI
        })
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) return actionError(actionName, { message: "Error: Failed to get access token from Google" });

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json"
        }
    });

    if (!userResponse.ok) return actionError(actionName, { message: "Error: Failed to fetch user info from Google" });

    const userData = await userResponse.json();

    const exists = await query("SELECT * FROM users WHERE email = $1", [userData.email]);

    if (exists.rowCount) return handleExistingUser(actionName, exists.rows[0]);

    const user = extractUser(userData);

    await insertUser(user);

    await generateSignedToken(
        {
            id: user.id,
            name: user.name,
            created_at: user.created_at,
            role: user.role,
            avatar_url: user.avatar_url
        },
        user.email
    );

    return actionSuccess(actionName, {}, { redirectPath: "/" });
}
