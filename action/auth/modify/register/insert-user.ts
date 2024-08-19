import INITIAL_USER_ROLE from "@/lib/utils/auth/initial-user-role";
import query from "@/lib/utils/db";
import { randomUUID } from "crypto";
import uploadAvatar from "./upload-avatar";

export default async function insertUser(
    email: string,
    name: string,
    hashedPassword: string,
    avatarFile: FormDataEntryValue | null
) {
    const avatarUrl = await uploadAvatar(avatarFile);

    const userId = randomUUID();

    const user = avatarUrl
        ? await query(
              `INSERT INTO users (id, email, name, password, created_at, avatar_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, name, created_at, avatar_url`,
              [userId, email, name, hashedPassword, new Date(), avatarUrl]
          )
        : await query(
              `INSERT INTO users (id, email, name, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, created_at, avatar_url`,
              [userId, email, name, hashedPassword, new Date()]
          );

    await query(
        `
        INSERT INTO users_roles (user_id, role_id)
        VALUES ($1, (SELECT id FROM roles WHERE name = $2))
    `,
        [userId, INITIAL_USER_ROLE]
    );

    return {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        created_at: user.rows[0].created_at,
        avatar_url: user.rows[0].avatar_url
    };
}
