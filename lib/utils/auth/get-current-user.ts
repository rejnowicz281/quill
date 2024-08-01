import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export default function getCurrentUser() {
    const token = cookies().get("token")?.value;

    if (!token) return null;

    const decodedToken = decodeJwt(token);

    return {
        id: decodedToken.sub as string,
        email: decodedToken.email as string,
        name: decodedToken.name as string,
        role: decodedToken.role as string,
        created_at: new Date(decodedToken.created_at as string)
    };
}
