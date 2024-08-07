import { MinimalPost } from "@/lib/types/post";
import query from "@/lib/utils/db";

export default async function getUserPosts(userId: string): Promise<MinimalPost[]> {
    const result = await query(
        `
    SELECT posts.id, posts.title, posts.created_at
    FROM posts
    WHERE posts.author_id = $1
    ORDER BY posts.created_at DESC
`,
        [userId]
    );

    return result.rows as MinimalPost[];
}
