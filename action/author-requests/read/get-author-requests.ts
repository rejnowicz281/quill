import { AuthorRequest } from "@/lib/types/author-request";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import query from "@/lib/utils/db";

export default async function getAuthorRequests(): Promise<AuthorRequest[]> {
    const currentUser = getCurrentUser();

    if (!currentUser) return [];

    const result = await query(
        `
        SELECT id, details, status, created_at FROM author_requests
        WHERE user_id = $1
        `,
        [currentUser.id]
    );

    return result.rows as AuthorRequest[];
}
