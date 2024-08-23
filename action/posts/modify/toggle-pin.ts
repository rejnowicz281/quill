"use server";

import actionSuccess from "@/lib/utils/actions/action-success";
import { isAdmin } from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

export default async function togglePin(postId: string) {
    const actionName = "togglePin";

    if (!(await isAdmin())) {
        await query(
            `
        UPDATE posts
        SET pinned = NOT pinned
        WHERE id = $1
    `,
            [postId]
        );
    }

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
}
