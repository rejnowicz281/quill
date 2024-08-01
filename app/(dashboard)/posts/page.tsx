import getAllPosts from "@/action/posts/read/get-all-posts";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function PostsPage() {
    const posts = await getAllPosts();

    return (
        <div className="flex flex-col p-4 gap-4">
            <Button asChild>
                <Link href="/">Home</Link>
            </Button>
            <Button asChild>
                <Link href="/posts/create">Create Post</Link>
            </Button>
            {posts.map((post) => (
                <Card key={post.id}>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.content}</CardDescription>
                    <CardFooter className="flex-col items-start">
                        <div>By {post.author_name}</div>
                        <div>Created at {new Date(post.created_at).toLocaleString()}</div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
