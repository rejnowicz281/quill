export type Role = "ROLE_USER" | "ROLE_AUTHOR" | "ROLE_ADMIN" | "ROLE_ROOT";

export type UserTokenPayload = {
    id: string;
    role: Role;
    version: number;
    name: string;
    email: string;
    avatar_url: string;
    created_at: string;
};
