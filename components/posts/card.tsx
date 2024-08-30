import Avatar from "@/components/general/avatar";
import PinPost from "@/components/posts/pin";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/types/post";
import { formatPostCreatedDate } from "@/lib/utils/general/date";
import { Pin } from "lucide-react";
import Link from "next/link";

export default function PostCard({ post, canPin }: { post: Post; canPin?: boolean }) {
    return (
        <Card className="relative">
            {post.pinned && (
                <div className="absolute top-6 -left-8">
                    <Pin size="23" />
                </div>
            )}
            {canPin && <PinPost post={post} />}
            <CardHeader>
                <CardTitle>
                    <Link className="break-words" href={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription className="line-clamp-4">{post.content}</CardDescription>
            </CardHeader>
            <CardFooter className="flex-col gap-4 items-start">
                <Link href={`/users/${post.author_id}`} className="flex gap-2 items-center">
                    <Avatar userId={post.author_id} markerSize={13} avatarSize={40} src={post.author_avatar_url} />
                    <div>
                        <div className="font-semibold">{post.author_name}</div>
                        <div className="text-sm text-gray-400">{formatPostCreatedDate(post.created_at)}</div>
                    </div>
                </Link>
            </CardFooter>
        </Card>
    );
}
