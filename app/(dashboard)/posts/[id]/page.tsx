import getPost from "@/action/posts/read/get-post";
import CommentForm from "@/components/posts/comments/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PostPage({ params: { id } }: { params: { id: string } }) {
    const post = await getPost(id);

    return (
        <div className="flex flex-col p-4 gap-4">
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

            <h2 className="text-xl">Comments</h2>
            <CommentForm postId={id} />
            <div className="flex flex-col gap-4">
                {post.comments.map((comment) => (
                    <Card key={comment.id}>
                        <CardHeader className="underline">{comment.author_name}</CardHeader>
                        <CardContent>{comment.content}</CardContent>
                        <CardFooter className="border-t pt-6 text-sm flex-col items-start">
                            <div>Created at {new Date(comment.created_at).toLocaleString()}</div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
