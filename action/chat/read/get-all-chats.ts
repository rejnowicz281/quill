// CREATE TABLE if not exists messages
// (
//     id                      UUID PRIMARY KEY,
//     content                 TEXT NOT NULL,
//     created_at              TIMESTAMP NOT NULL,
//     sender_id               UUID NOT NULL,
//     receiver_id             UUID NOT NULL,
//     referenced_post_id      UUID,
//     FOREIGN KEY (sender_id) REFERENCES users(id),
//     FOREIGN KEY (receiver_id) REFERENCES users(id),
//     FOREIGN KEY (referenced_post_id) REFERENCES posts(id)
// );

import { UserChat } from "@/lib/types/chat/user-chat";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";

export default async function getAllChats(): Promise<UserChat[]> {
    const currentUser = getCurrentUser();

    if (!currentUser) return [];

    const chats = await query(
        `
               SELECT 
            u.id, 
            u.name, 
            m.content AS last_message_content, 
            m.created_at AS last_message_created_at,
            m.sender_id AS last_message_sender_id,
            sender_user.name AS last_message_sender_name
        FROM (
            SELECT DISTINCT ON (
                CASE
                    WHEN sender_id = $1 THEN receiver_id
                    ELSE sender_id
                END
            ) *,
            CASE
                WHEN sender_id = $1 THEN receiver_id
                ELSE sender_id
            END AS chat_user_id
            FROM messages
            WHERE sender_id = $1 OR receiver_id = $1
            ORDER BY
                CASE
                    WHEN sender_id = $1 THEN receiver_id
                    ELSE sender_id
                END,
                created_at DESC
        ) m
        JOIN users u ON u.id = m.chat_user_id
        JOIN users sender_user ON sender_user.id = m.sender_id
        ORDER BY m.created_at DESC;
        `,
        [currentUser.id]
    );

    return chats.rows as UserChat[];
}
