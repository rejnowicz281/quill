import { Role } from "@/lib/types/auth";
import { User } from "@/lib/types/user";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export default function getCurrentUser(): User | null {
    const token = cookies().get("token")?.value;

    if (!token) return null;

    const decodedToken = decodeJwt(token);

    return {
        id: decodedToken.sub as string,
        email: decodedToken.email as string,
        name: decodedToken.name as string,
        role: decodedToken.role as Role,
        created_at: decodedToken.created_at as string
    };
}
