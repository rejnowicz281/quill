"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";

export default async function editAuthorRequest(formData: FormData) {
    const actionName = "editAuthorRequest";

    const detailsFormData = formData.get("details");

    const details = typeof detailsFormData === "string" ? detailsFormData.trim() : null;

    if (!details) return actionError(actionName, { message: "Details cannot be empty" });

    const currentUser = getCurrentUser();

    if (!currentUser) return actionError(actionName, { message: "You must be logged in to edit your author request" });

    await query(
        `
        UPDATE author_requests
        SET details = $1
        WHERE user_id = $2
        AND status = 'PENDING'
    `,
        [details, currentUser.id]
    );

    return actionSuccess(actionName, {}, { revalidatePath: "/author-requests" });
}
