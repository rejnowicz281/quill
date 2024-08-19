import { User } from "@/lib/types/user";
import query from "@/lib/utils/db";

export default async function insertUser(user: User) {
    await query(`INSERT INTO users (id, email, name, created_at, avatar_url) VALUES ($1, $2, $3, $4, $5)`, [
        user.id,
        user.email,
        user.name,
        user.created_at,
        user.avatar_url
    ]);

    await query(
        `
        INSERT INTO users_roles (user_id, role_id)
        VALUES ($1, (SELECT id FROM roles WHERE name = $2))
    `,
        [user.id, user.role]
    );
}
