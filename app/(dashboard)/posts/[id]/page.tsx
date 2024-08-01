import getPost from "@/action/posts/read/get-post";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function PostPage({ params: { id } }: { params: { id: string } }) {
    const post = await getPost(id);

    return (
        <div className="flex flex-col p-4 gap-4">
            <Button asChild>
                <Link href="/posts">All Posts</Link>
            </Button>

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
        </div>
    );
}
