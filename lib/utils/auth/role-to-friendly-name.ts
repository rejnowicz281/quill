import { Role } from "@/lib/types/auth/role";

export default function roleToFriendlyName(role: Role) {
    switch (role) {
        case "ROLE_USER":
            return "User";
        case "ROLE_AUTHOR":
            return "Author";
        case "ROLE_ADMIN":
            return "Admin";
        case "ROLE_ROOT":
            return "Root";
        default:
            return "Unknown";
    }
}
