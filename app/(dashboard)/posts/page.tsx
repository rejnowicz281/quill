import getAllPosts from "@/action/posts/read/get-all";
import PinPost from "@/components/posts/pin";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import authorize from "@/lib/utils/auth/authorize";
import { Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function PostsPage() {
    const posts = await getAllPosts();

    const canPin = authorize("ADMIN");

    return (
        <div className="flex flex-col p-4 gap-4">
            {posts.map((post) => (
                <Card key={post.id}>
                    {canPin && <PinPost post={post} />}
                    <CardHeader>
                        <CardTitle className="flex gap-2">
                            {post.pinned && <Pin />}
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </CardTitle>
                        <CardDescription className="whitespace-pre-line">{post.content}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex-col items-start">
                        <div className="flex gap-2 items-center">
                            <Image
                                width={32}
                                height={32}
                                className="rounded-[50%]"
                                src={post.author_avatar_url}
                                alt={post.author_id}
                            />
                            {post.author_name}
                        </div>
                        <div>Created at {new Date(post.created_at).toLocaleString()}</div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
