"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import API from "@/lib/utils/api";
import { setCookieToken } from "@/lib/utils/auth";

export default async function login(formData: FormData) {
    const actionName = "login";

    const email = formData.get("email");
    const password = formData.get("password");

    const res = await API.post(
        "auth/login",
        {
            email,
            password
        },
        false
    );

    let data: any = null;

    try {
        data = await res.json();
    } catch (err) {
        return actionError(actionName);
    }

    const token = data?.token;

    if (token) setCookieToken(token);
    else return actionError(actionName);

    return actionSuccess(actionName, { token }, { redirectPath: "/" });
}
