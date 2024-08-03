import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/types/post/post";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import DeletePost from "./delete-post";
import EditPost from "./edit-post";

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
                <div>By {post.author_name}</div>
                <div>Created at {new Date(post.created_at).toLocaleString()}</div>
            </CardFooter>
        </Card>
    );
}
