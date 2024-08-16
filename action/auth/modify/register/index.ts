"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import setCookieToken from "@/lib/utils/auth/set-cookie-token";
import query from "@/lib/utils/db";
import registerSchema from "@/lib/utils/forms/auth/register/schema";
import bcrypt from "bcrypt";
import insertUser from "./insert-user";

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

    const insertedUser = await insertUser(email, name, hashedPassword, formData.get("avatar"));

    const token = await generateSignedToken(
        {
            id: insertedUser.id,
            name: insertedUser.name,
            created_at: insertedUser.created_at,
            role: "ROLE_ADMIN",
            avatar_url: insertedUser.avatar_url
        },
        insertedUser.email
    );

    setCookieToken(token);

    return actionSuccess(actionName, { token }, { redirectPath: "/" });
}
