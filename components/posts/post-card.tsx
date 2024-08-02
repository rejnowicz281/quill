import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/types/post";

export default function PostCard({ post }: { post: Post }) {
    return (
        <Card>
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
