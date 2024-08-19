import INITIAL_USER_ROLE from "@/lib/utils/auth/initial-user-role";
import { randomUUID } from "crypto";

export default function extractUser(userData: any) {
    return {
        id: randomUUID(),
        email: userData.email,
        name: userData.name || userData.login || userData.email,
        avatar_url: userData.avatar_url || userData.picture,
        created_at: new Date().toISOString(),
        role: INITIAL_USER_ROLE
    };
}
