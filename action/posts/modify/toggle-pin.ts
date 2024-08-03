"use server";

import { Post } from "@/lib/types/post/post";
import actionSuccess from "@/lib/utils/actions/action-success";
import authorize from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

export default async function togglePin(post: Post) {
    const actionName = "togglePin";

    if (authorize("ADMIN")) {
        await query(
            `
        UPDATE posts
        SET pinned = NOT pinned
        WHERE id = $1
    `,
            [post.id]
        );
    }

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
}
