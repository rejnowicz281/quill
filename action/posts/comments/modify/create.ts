"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import commentSchema from "@/lib/utils/forms/schemas/comment-schema";
import { randomUUID } from "crypto";

export default async function createComment(formData: FormData, postId?: string) {
    const actionName = "createComment";

    if (!postId) return actionError(actionName, { message: "Post id is required" });

    const { data, error } = commentSchema.safeParse(Object.fromEntries(formData));

    if (error) return actionError(actionName, { message: error.message });

    const { content } = data;

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to comment on a post" });

    await query(
        `
        INSERT INTO comments (id, content, user_id, post_id, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
        
    `,
        [randomUUID(), content, currentUser.id, postId, new Date()]
    );

    return actionSuccess(actionName, {}, { revalidatePath: `/posts/${postId}` });
}
