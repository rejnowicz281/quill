import { Role } from "./auth";

export type BasicUser = {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
};

export type MinimalUser = {
    id: string;
    name: string;
    role: Role;
    avatar_url: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
    role: Role;
    avatar_url: string;
    created_at: string;
};
