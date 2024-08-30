import { Role } from "@/lib/types/auth";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export default function getCurrentUser() {
    const token = cookies().get("token")?.value;

    if (!token) throw new Error("No token found");

    const decodedToken = decodeJwt(token);

    return {
        id: decodedToken.id as string,
        email: decodedToken.sub as string,
        name: decodedToken.name as string,
        role: decodedToken.role as Role,
        created_at: decodedToken.created_at as string,
        avatar_url: decodedToken.avatar_url as string
    };
}
