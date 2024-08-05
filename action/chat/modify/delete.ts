"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";

export default async function deleteMessage(messageId: string) {
    const actionName = "deleteMessage";

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to delete a message" });

    await query(
        `
        DELETE FROM messages
        WHERE id = $1
        AND sender_id = $2
    `,
        [messageId, currentUser.id]
    );

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
}
