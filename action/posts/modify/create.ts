"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import { isAuthor } from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import postSchema from "@/lib/utils/forms/post/schema";
import { randomUUID } from "crypto";

export default async function createPost(formData: FormData) {
    const actionName = "createPost";

    if (!(await isAuthor())) return actionError(actionName, { message: "You must be an author to create a post" });

    const { data, error } = postSchema.safeParse(Object.fromEntries(formData));

    if (error) return actionError(actionName, { message: error.message });

    const { title, content } = data;

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to create a post" });

    const post = await query(
        `
        INSERT INTO posts (id, title, content, author_id, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
        
    `,
        [randomUUID(), title, content, currentUser.id, new Date()]
    );

    return actionSuccess(actionName, {}, { redirectPath: `/posts/${post.rows[0].id}` });
}
