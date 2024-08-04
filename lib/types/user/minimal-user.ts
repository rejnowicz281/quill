import { Role } from "../auth/role";

export type MinimalUser = {
    id: string;
    name: string;
    role: Role;
};
