import getAllPosts from "@/action/posts/read/get-all-posts";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function PostsPage() {
    const posts = await getAllPosts();

    return (
        <div className="flex flex-col p-4 gap-4">
            {posts.map((post) => (
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle>
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </CardTitle>
                        <CardDescription className="whitespace-pre-line">{post.content}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex-col items-start">
                        <div>By {post.author_name}</div>
                        <div>Created at {new Date(post.created_at).toLocaleString()}</div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
