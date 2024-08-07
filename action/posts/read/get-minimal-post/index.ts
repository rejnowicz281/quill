import { MinimalPost } from "@/lib/types/post";
import query from "@/lib/utils/db";

export default async function getMinimalPost(postId: string): Promise<MinimalPost> {
    const result = await query(
        `
    SELECT posts.id, posts.title
    FROM posts
    WHERE id = $1
`,
        [postId]
    );

    return result.rows[0] as MinimalPost;
}
