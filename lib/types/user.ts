import { Role } from "./auth";

export type BasicUser = {
    id: string;
    email: string;
    name: string;
};

export type MinimalUser = {
    id: string;
    name: string;
    role: Role;
};

export type User = {
    id: string;
    email: string;
    name: string;
    role: Role;
    created_at: string;
};
