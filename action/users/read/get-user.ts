import { BasicPost } from "@/lib/types/post";
import { User } from "@/lib/types/user";
import query from "@/lib/utils/db";

type UserWithPosts = {
    user: User;
    posts: BasicPost[];
};

export default async function getUser(id: string): Promise<UserWithPosts> {
    const user = await query(
        `
    SELECT u.id, u.name, u.email, u.created_at, u.avatar_url, r.name as role
    FROM users u
    JOIN users_roles ur ON u.id = ur.user_id
    JOIN roles r ON ur.role_id = r.id
    WHERE u.id = $1
`,
        [id]
    );

    const posts = await query(
        `
    SELECT posts.id, posts.title, posts.content, posts.created_at, posts.pinned
    FROM posts
    WHERE posts.author_id = $1
    ORDER BY posts.pinned DESC, posts.created_at DESC
`,
        [id]
    );

    return {
        user: user.rows[0],
        posts: posts.rows
    } as UserWithPosts;
}
