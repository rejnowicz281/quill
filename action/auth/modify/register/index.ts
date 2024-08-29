"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import generateSignedToken from "@/lib/utils/auth/generate-signed-token";
import INITIAL_USER_ROLE from "@/lib/utils/auth/initial-user-role";
import query from "@/lib/utils/db";
import registerSchema from "@/lib/utils/forms/auth/register/schema";
import bcrypt from "bcrypt";
import insertUser from "./insert-user";

const defaultRedirectPath = (message: string) => `/register?message=${message}`;

export default async function register(formData: FormData) {
    const actionName = "register";

    const { data, error } = registerSchema.safeParse(Object.fromEntries(formData));

    if (error)
        return actionError(
            actionName,
            { message: error.message },
            { redirectPath: defaultRedirectPath(error.message) }
        );

    const { email, name, password } = data;

    const exists = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (exists.rowCount) {
        const message = "Email already in use";

        return actionError(actionName, { message }, { redirectPath: defaultRedirectPath(message) });
    }

    const hashedPassword = await bcrypt.hash(password, 10).catch(() => {
        return null;
    });

    if (!hashedPassword)
        return actionError(actionName, {
            message: "Error hashing password",
            redirectPath: defaultRedirectPath("Error hashing password")
        });

    const insertedUser = await insertUser(email, name, hashedPassword, formData.get("avatar"));

    await generateSignedToken(
        {
            id: insertedUser.id,
            name: insertedUser.name,
            created_at: insertedUser.created_at,
            role: INITIAL_USER_ROLE,
            avatar_url: insertedUser.avatar_url,
            version: 0
        },
        insertedUser.email
    );

    return actionSuccess(actionName, {}, { redirectPath: "/" });
}
