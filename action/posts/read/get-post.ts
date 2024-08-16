import { Post } from "@/lib/types/post";
import { Comment } from "@/lib/types/post/comment";
import query from "@/lib/utils/db";

type PostWithComments = {
    post: Post;
    comments: Comment[];
};

export default async function getPost(id: string): Promise<PostWithComments> {
    const [post, coments] = await Promise.all([
        query(
            `
    SELECT posts.id, posts.title, posts.content, posts.created_at, posts.pinned, users.id as author_id, users.name as author_name, users.avatar_url as author_avatar_url
    FROM posts
    JOIN users ON posts.author_id = users.id
    WHERE posts.id = $1
    ORDER BY posts.created_at DESC
`,
            [id]
        ),
        query(
            `
    SELECT comments.id, comments.content, comments.created_at, comments.post_id, users.id as user_id, users.name as user_name, users.avatar_url as user_avatar_url
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at DESC
`,
            [id]
        )
    ]);

    return {
        post: post.rows[0],
        comments: coments.rows
    } as PostWithComments;
}
