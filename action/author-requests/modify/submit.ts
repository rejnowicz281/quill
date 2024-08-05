"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";
import { randomUUID } from "crypto";

export default async function submitAuthorRequest(formData: FormData) {
    const actionName = "submitAuthorRequest";

    const detailsFormData = formData.get("details");

    const details = typeof detailsFormData === "string" ? detailsFormData.trim() : null;

    if (!details) return actionError(actionName, { message: "Details cannot be empty" });

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to send an author request" });

    await query(
        `
        INSERT INTO author_requests (id, status, details, user_id, created_at)
        VALUES ($1, $2, $3, $4, $5)
    `,
        [randomUUID(), "PENDING", details, currentUser.id, new Date()]
    );

    return actionSuccess(actionName, {}, { revalidatePath: "/author-requests" });
}
