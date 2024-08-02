import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export default function authorize(
    role: "USER" | "ADMIN" | "AUTHOR" | "ROOT" | "ROLE_USER" | "ROLE_ADMIN" | "ROLE_AUTHOR" | "ROLE_ROOT"
) {
    const currentUserToken = cookies().get("token")?.value;

    if (!currentUserToken) return false;

    const payload = decodeJwt(currentUserToken);

    if ((role === "ADMIN" || role === "ROLE_ADMIN") && payload.role !== "ROLE_ADMIN" && payload.role !== "ROLE_ROOT")
        return false;
    else if ((role === "USER" || role === "ROLE_USER") && payload.role !== "ROLE_USER") return false;
    else if ((role === "AUTHOR" || role === "ROLE_AUTHOR") && payload.role !== "ROLE_AUTHOR") return false;
    else if ((role === "ROOT" || role === "ROLE_ROOT") && payload.role !== "ROLE_ROOT") return false;

    return true;
}
