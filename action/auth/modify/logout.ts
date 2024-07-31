"use server";

import actionSuccess from "@/lib/utils/actions/action-success";
import { cookies } from "next/headers";

export default async function logout() {
    const actionName = "logout";

    cookies().delete("token");

    return actionSuccess(actionName, {}, { redirectPath: "/login" });
}
