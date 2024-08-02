"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import { randomUUID } from "crypto";

export default async function createMessage(formData: FormData, receiverId: string, referencedPostId?: string) {
    const actionName = "createMessage";

    const contentFormData = formData.get("content");

    const content = typeof contentFormData === "string" ? contentFormData.trim() : null;

    if (!content) return actionError(actionName, { message: "Message cannot be empty" });

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to send a message" });

    await query(
        `
        INSERT INTO messages (id, content, sender_id, receiver_id, referenced_post_id, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
    `,
        [randomUUID(), content, currentUser.id, receiverId, referencedPostId, new Date()]
    );

    return actionSuccess(actionName, {}, { revalidatePath: `/chats/${receiverId}` });
}
