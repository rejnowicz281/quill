import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/types/post";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import EditPost from "./edit-post";

export default function PostCard({ post }: { post: Post }) {
    const currentUser = getCurrentUser();
    const isOwner = currentUser && currentUser.id === post.author_id;

    return (
        <Card>
            {isOwner && <EditPost post={post} />}
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
