"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import setCookieToken from "@/lib/utils/auth/set-cookie-token";
import query from "@/lib/utils/db";
import bcrypt from "bcrypt";

const actionName = "login";

function loginGenericError() {
    return actionError(actionName, { message: "Invalid email or password" });
}

export default async function login(formData: FormData) {
    const emailFormData = formData.get("email");
    const passwordFormData = formData.get("password");

    const email = typeof emailFormData === "string" ? emailFormData : null;
    const password = typeof passwordFormData === "string" ? passwordFormData : null;

    if (!email || !password) return loginGenericError();

    const user = await query("SELECT id, name, created_at, password FROM users WHERE email = $1", [email]);

    if (!user.rowCount) return loginGenericError();

    const match = await bcrypt.compare(password, user.rows[0].password);

    if (!match) return loginGenericError();

    const role = await query(
        `
    SELECT roles.name
    FROM users_roles
    JOIN roles ON users_roles.role_id = roles.id
    WHERE user_id = $1
`,
        [user.rows[0].id]
    );

    const token = await generateSignedToken(
        {
            email,
            name: user.rows[0].name,
            created_at: user.rows[0].created_at,
            role: role.rows[0].name
        },
        user.rows[0].id
    );

    setCookieToken(token);

    return actionSuccess(actionName, { token }, { redirectPath: "/" });
}
