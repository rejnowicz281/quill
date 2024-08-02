import { decodeJwt } from "jose";
import { cookies } from "next/headers";

type Role = "USER" | "ADMIN" | "AUTHOR";

export default function authorize(role?: Role) {
    const currentUserToken = cookies().get("token")?.value;

    if (!currentUserToken) return false;

    const payload = decodeJwt(currentUserToken);

    if (payload.role === "ROLE_ROOT") return true;

    if (payload.role === "ROLE_ADMIN") {
        if (role === "ADMIN" || role === "USER" || role === "AUTHOR") return true;
    }

    if (role === "USER" && payload.role === "ROLE_USER") return true;

    if (role === "AUTHOR" && payload.role === "ROLE_AUTHOR") return true;

    return false;
}
