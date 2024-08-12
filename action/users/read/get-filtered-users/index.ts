import { MinimalUser } from "@/lib/types/user";
import query from "@/lib/utils/db";

export default async function getFilteredUsers(filter: string) {
    const result = await query(
        `
    SELECT u.id, u.name, r.name as role, u.avatar_url
    FROM users u
    JOIN users_roles ur ON ur.user_id = u.id
    JOIN roles r ON r.id = ur.role_id
    WHERE u.name ILIKE $1
    `,
        [`%${filter}%`]
    );

    return result.rows as MinimalUser[];
}
