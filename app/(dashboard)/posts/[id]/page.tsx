import getPost from "@/action/posts/read/get-post";
import Avatar from "@/components/general/avatar";
import CommentCard from "@/components/posts/comments/card";
import CommentForm from "@/components/posts/comments/form";
import DeletePost from "@/components/posts/delete";
import EditPost from "@/components/posts/edit";
import PinPost from "@/components/posts/pin";
import { Button } from "@/components/ui/button";
import { shallowAuthorize } from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { formatPostCreatedDate } from "@/lib/utils/general/date";
import Link from "next/link";

export default async function PostPage({ params: { id } }: { params: { id: string } }) {
    const { post, comments } = await getPost(id);

    const currentUser = getCurrentUser();

    const canEdit = currentUser.id === post.author_id || shallowAuthorize("ROLE_ROOT", currentUser.role);
    const canDelete = currentUser.id === post.author_id || shallowAuthorize("ROLE_ADMIN", currentUser.role);
    const canPin = shallowAuthorize("ROLE_ADMIN", currentUser.role);

    return (
        <div className="py-8">
            <div className="flex flex-col justify-center items-center gap-4 mb-8">
                <h1 className="text-5xl text-center font-semibold">{post.title}</h1>
                <div className="justify-center flex items-center gap-2">
                    <Link className="flex gap-2 items-center font-semibold" href={`/users/${post.author_id}`}>
                        <Avatar userId={post.author_id} markerSize={13} avatarSize={40} src={post.author_avatar_url} />
                        {post.author_name}
                    </Link>
                    <div className="text-gray-400">·</div>
                    <div className="text-gray-400">{formatPostCreatedDate(post.created_at)}</div>
                </div>
                <Button size="sm" asChild variant="outline">
                    <Link href={`/chats/${post.author_id}?referencedPostId=${post.id}`}>Contact</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                {(canPin || canDelete || canEdit) && (
                    <div className="flex gap-4 justify-center items-center">
                        {canPin && <PinPost post={post} />}
                        {canEdit && <EditPost post={post} />}
                        {canDelete && <DeletePost post={post} />}
                    </div>
                )}
                <div className="whitespace-pre-line text-xl">{post.content}</div>
            </div>
            <h2 className="pt-10 pb-5 text-2xl font-semibold">Comments</h2>
            <div className="flex flex-col gap-10">
                <CommentForm postId={id} />
                <div className="flex flex-col gap-5">
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}
