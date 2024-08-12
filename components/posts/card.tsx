import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/types/post";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import Link from "next/link";
import Avatar from "../general/avatar";
import DeletePost from "./delete";
import EditPost from "./edit";

export default function PostCard({ post }: { post: Post }) {
    const currentUser = getCurrentUser();
    const canEdit = currentUser && (currentUser.id === post.author_id || currentUser.role === "ROLE_ROOT");
    const canDelete =
        currentUser &&
        (currentUser.id === post.author_id || currentUser.role === "ROLE_ROOT" || currentUser.role === "ROLE_ADMIN");

    return (
        <Card>
            {canEdit && <EditPost post={post} />}
            {canDelete && <DeletePost post={post} />}
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-line">{post.content}</CardContent>
            <CardFooter className="border-t pt-6 text-sm flex-col items-start">
                <Link className="flex gap-2 items-center" href={`/chats/${post.author_id}?referencedPostId=${post.id}`}>
                    <Avatar userId={post.author_id} avatarSize={32} src={post.author_avatar_url} />
                    {post.author_name}
                </Link>
                <div>Created at {new Date(post.created_at).toLocaleString()}</div>
            </CardFooter>
        </Card>
    );
}
