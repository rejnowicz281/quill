import getUser from "@/action/users/read/get-user";
import Avatar from "@/components/general/avatar";
import PinPost from "@/components/posts/pin";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { shallowAuthorize } from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import roleToFriendlyName from "@/lib/utils/auth/role-to-friendly-name";
import { MessageCircleReply, Pin } from "lucide-react";
import Link from "next/link";

export default async function UserPage({ params: { id } }: { params: { id: string } }) {
    const { user, posts } = await getUser(id);

    const currentRole = getCurrentUser()?.role;

    if (!currentRole) return null;

    const canPin = shallowAuthorize("ROLE_ADMIN", currentRole);

    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-3 pb-6">
                <Avatar avatarSize={100} markerSize={25} src={user.avatar_url} userId={id} />
                <div>
                    <span>{user.name}</span>{" "}
                    <span className="text-sm text-zinc-500">/ {roleToFriendlyName(user.role)}</span>
                </div>
                <div className="font-semibold">{user.email}</div>
                <div className="text-zinc-500">Member since {new Date(user.created_at).toLocaleDateString()}</div>
                <Button className="flex items-center gap-2" asChild variant="link">
                    <Link href={`/chats/${user.id}`}>
                        <MessageCircleReply />
                        Contact
                    </Link>
                </Button>
            </div>
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
                        <CardDescription className="break-words whitespace-pre-line">{post.content}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex-col gap-4 items-start">
                        <Link href={`/users/${user.id}`} className="flex gap-2 items-center">
                            <Avatar userId={user.id} markerSize={12} avatarSize={32} src={user.avatar_url} />
                            {user.name}
                        </Link>
                        <div className="text-sm text-zinc-500">
                            Created at {new Date(post.created_at).toLocaleString()}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
