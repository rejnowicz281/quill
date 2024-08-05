import { AuthorRequestWithUser } from "@/lib/types/author-request";
import authorize from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

export default async function getAuthorRequests(): Promise<AuthorRequestWithUser[]> {
    if (!authorize("ADMIN")) return [];

    const result = await query(
        `
        SELECT ar.id, ar.details, ar.status, ar.created_at, u.id as user_id, u.name as user_name
        FROM author_requests ar
        JOIN users u ON u.id = ar.user_id
        ORDER BY created_at DESC
        `
    );

    return result.rows as AuthorRequestWithUser[];
}
