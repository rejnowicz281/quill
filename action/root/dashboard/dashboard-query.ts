import { BasicUser } from "@/lib/types/user";
import { isRoot } from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

export default async function rootDashboardQuery(): Promise<BasicUser[]> {
    if (!(await isRoot())) return [];

    const result = await query(`
        SELECT u.id, u.name, u.email, u.avatar_url
        FROM users u
        JOIN users_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        WHERE r.name = 'ROLE_ADMIN'
        `);

    return result.rows as BasicUser[];
}
