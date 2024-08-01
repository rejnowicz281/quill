"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import postSchema from "@/lib/utils/forms/schemas/post-schema";
import { randomUUID } from "crypto";

export default async function createPost(formData: FormData) {
    const actionName = "createPost";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const parsed = postSchema.safeParse({ title, content });

    if (parsed.error) return actionError(actionName, { message: parsed.error.message });

    const currentUser = getCurrentUser();

    await query(
        `
        INSERT INTO posts (id, title, content, author_id, created_at)
        VALUES ($1, $2, $3, $4, $5)
        
    `,
        [randomUUID(), title, content, currentUser.id, new Date()]
    );

    return actionSuccess(actionName);
}
