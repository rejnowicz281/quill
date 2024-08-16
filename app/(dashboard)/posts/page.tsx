import getAllPosts from "@/action/posts/read/get-all";
import Avatar from "@/components/general/avatar";
import PageTitle from "@/components/general/page-title";
import PinPost from "@/components/posts/pin";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import authorize from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { Pin, Plus, User } from "lucide-react";
import Link from "next/link";

export default async function PostsPage() {
    const posts = await getAllPosts();

    const canPin = authorize("ADMIN");

    const user = getCurrentUser();

    if (!user) return null;

    return (
        <div>
            <PageTitle>Homepage</PageTitle>

            {user.role === "ROLE_USER" && (
                <Button
                    asChild
                    variant="ghost"
                    className="inline-flex flex-row gap-2 items-center border rounded-2xl mb-8"
                >
                    <Link href={`/author-requests`}>
                        <User />
                        <div>Become An Author</div>
                    </Link>
                </Button>
            )}
            {authorize("AUTHOR") && (
                <Button
                    asChild
                    variant="ghost"
                    className="inline-flex flex-row gap-2 items-center border rounded-2xl mb-8"
                >
                    <Link href={`/posts/create`}>
                        <Plus />
                        <div>Create Post</div>
                    </Link>
                </Button>
            )}

            <div className="flex flex-col gap-4">
                {posts.map((post) => (
                    <Card key={post.id}>
                        {canPin && <PinPost post={post} />}
                        <CardHeader>
                            <CardTitle>
                                {post.pinned && (
                                    <div className="inline-block pr-2">
                                        <Pin size="23" />
                                    </div>
                                )}
                                <Link className="break-words" href={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </CardTitle>
                            <CardDescription className="break-words whitespace-pre-line">
                                {post.content}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex-col gap-4 items-start">
                            <Link href={`/users/${post.author_id}`} className="flex gap-2 items-center">
                                <Avatar
                                    userId={post.author_id}
                                    markerSize={12}
                                    avatarSize={32}
                                    src={post.author_avatar_url}
                                />
                                {post.author_name}
                            </Link>
                            <div className="text-sm text-zinc-500">
                                Created at {new Date(post.created_at).toLocaleString()}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
