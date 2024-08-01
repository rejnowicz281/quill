import query from "@/lib/utils/db";

type Post = {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    author_name: string;
};

export default async function getAllPosts(): Promise<Post[]> {
    const result = await query(
        `
    SELECT posts.id, posts.title, posts.content, posts.created_at, users.name AS author_name
    FROM posts
    JOIN users ON posts.author_id = users.id
    ORDER BY posts.created_at DESC
`
    );

    return result.rows as Post[];
}
