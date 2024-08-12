import { AuthorRequestWithUser } from "@/lib/types/author-request";
import { BasicUser } from "@/lib/types/user";
import authorize from "@/lib/utils/auth/authorize";
import query from "@/lib/utils/db";

type Query = {
    authorRequests: AuthorRequestWithUser[];
    authors: BasicUser[];
};

export default async function adminDashboardQuery(): Promise<Query> {
    if (!authorize("ADMIN")) return { authorRequests: [], authors: [] };

    const [authorRequestsQuery, authorsQuery] = await Promise.all([
        query(
            `
        SELECT ar.id, ar.details, ar.status, ar.created_at, u.id as user_id, u.name as user_name, u.avatar_url as user_avatar_url
        FROM author_requests ar
        JOIN users u ON u.id = ar.user_id
        ORDER BY created_at DESC, status = 'PENDING' DESC
        `
        ),
        query(`
        SELECT u.id, u.name, u.email, u.avatar_url
        FROM users u
        JOIN users_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        WHERE r.name = 'ROLE_AUTHOR'
        `)
    ]);

    return {
        authorRequests: authorRequestsQuery.rows,
        authors: authorsQuery.rows
    } as Query;
}
