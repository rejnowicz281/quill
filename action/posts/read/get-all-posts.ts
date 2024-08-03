import { Post } from "@/lib/types/post/post";
import query from "@/lib/utils/db";

export default async function getAllPosts(): Promise<Post[]> {
    const result = await query(
        `
    SELECT posts.id, posts.title, posts.content, posts.created_at, posts.pinned, users.name AS author_name
    FROM posts
    JOIN users ON posts.author_id = users.id
    ORDER BY posts.pinned DESC, posts.created_at DESC
`
    );

    return result.rows as Post[];
}
