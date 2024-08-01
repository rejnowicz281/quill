import { Post } from "@/lib/types/post";
import query from "@/lib/utils/db";

export default async function getPost(id: string): Promise<Post> {
    const result = await query(
        `
    SELECT posts.id, posts.title, posts.content, posts.created_at, users.name AS author_name
    FROM posts
    JOIN users ON posts.author_id = users.id
    WHERE posts.id = $1
    ORDER BY posts.created_at DESC
`,
        [id]
    );

    return result.rows[0] as Post;
}
