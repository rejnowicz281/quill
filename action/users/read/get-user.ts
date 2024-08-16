import { User } from "@/lib/types/user";
import query from "@/lib/utils/db";

export default async function getUser(id: string): Promise<User> {
    const user = await query(
        `
    SELECT u.id, u.name, u.email, u.created_at, u.avatar_url, r.name as role
    FROM users u
    JOIN users_roles ur ON u.id = ur.user_id
    JOIN roles r ON ur.role_id = r.id
    WHERE u.id = $1
`,
        [id]
    );

    return user.rows[0] as User;
}
