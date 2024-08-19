import { Role } from "@/lib/types/auth";
import { randomUUID } from "crypto";

export default function extractUser(userData: any) {
    return {
        id: randomUUID(),
        email: userData.email,
        name: userData.name || userData.login,
        avatar_url: userData.avatar_url,
        created_at: new Date().toISOString(),
        role: "ROLE_AUTHOR" as Role
    };
}
