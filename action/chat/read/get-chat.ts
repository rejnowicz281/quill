import { Chat } from "@/lib/types/chat";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import generateTimestamps from "@/lib/utils/general/generate-timestamps";

export default async function getChat(userId: string): Promise<Chat | null> {
    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    const user = await query(
        `
        SELECT u.id, u.name, r.name AS role, u.avatar_url
            FROM users u
            JOIN users_roles ur ON ur.user_id = u.id
            JOIN roles r ON r.id = ur.role_id
            WHERE u.id = $1;
        `,
        [userId]
    );

    if (user.rows.length === 0) return null;

    const messages = await query(
        `
            SELECT 
                m.id,
                m.content,
                m.created_at,
                m.sender_id,
                u.name AS sender_name,
                m.referenced_post_id,
                p.title AS referenced_post_title
            FROM messages m
            JOIN users u ON u.id = m.sender_id
            LEFT JOIN posts p ON p.id = m.referenced_post_id
            WHERE (m.sender_id = $1 AND m.receiver_id = $2) OR (m.sender_id = $2 AND m.receiver_id = $1)
            ORDER BY m.created_at ASC;
        `,
        [currentUser.id, userId]
    );

    generateTimestamps(messages.rows as any);

    return {
        user: user.rows[0],
        messages: messages.rows
    } as Chat;
}
