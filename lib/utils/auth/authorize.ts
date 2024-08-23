import { Role } from "@/lib/types/auth";
import verifyUserToken from "./verify-token";

const rolePrivileges = {
    ROLE_ROOT: ["ROLE_ROOT", "ROLE_ADMIN", "ROLE_AUTHOR", "ROLE_USER"],
    ROLE_ADMIN: ["ROLE_ADMIN", "ROLE_AUTHOR", "ROLE_USER"],
    ROLE_AUTHOR: ["ROLE_AUTHOR", "ROLE_USER"],
    ROLE_USER: ["ROLE_USER"]
};

export async function authorize(role: Role) {
    const payload = await verifyUserToken();

    if (!payload) return false;

    return shallowAuthorize(role, payload.role);
}

export function shallowAuthorize(role: Role, userRole: Role) {
    return rolePrivileges[userRole].includes(role);
}

export async function isAdmin() {
    return await authorize("ROLE_ADMIN");
}

export async function isAuthor() {
    return await authorize("ROLE_AUTHOR");
}

export async function isUser() {
    return await authorize("ROLE_USER");
}

export async function isRoot() {
    return await authorize("ROLE_ROOT");
}
