"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import setCookieToken from "@/lib/utils/auth/set-cookie-token";
import query from "@/lib/utils/db";
import registerSchema from "@/lib/utils/forms/auth/register/schema";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export default async function register(formData: FormData) {
    const actionName = "register";

    const { data, error } = registerSchema.safeParse(Object.fromEntries(formData));

    if (error) return actionError(actionName, { message: error.message });

    const { email, name, password } = data;

    const exists = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (exists.rowCount) return actionError(actionName, { message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10).catch(() => {
        return null;
    });

    if (!hashedPassword) return actionError(actionName);

    const user = await query(
        "INSERT INTO users (id, email, name, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, created_at",
        [randomUUID(), email, name, hashedPassword, new Date()]
    );

    await query(
        `
    INSERT INTO users_roles (user_id, role_id)
    VALUES ($1, (SELECT id FROM roles WHERE name = 'ROLE_USER'))
`,
        [user.rows[0].id]
    );

    const token = await generateSignedToken(
        {
            email,
            name: user.rows[0].name,
            created_at: user.rows[0].created_at,
            role: "ROLE_USER"
        },
        user.rows[0].id
    );

    setCookieToken(token);

    return actionSuccess(actionName, { token }, { redirectPath: "/" });
}
