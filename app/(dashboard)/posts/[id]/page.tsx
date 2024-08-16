import getPost from "@/action/posts/read/get-post";
import Avatar from "@/components/general/avatar";
import CommentCard from "@/components/posts/comments/card";
import CommentForm from "@/components/posts/comments/form";
import DeletePost from "@/components/posts/delete";
import EditPost from "@/components/posts/edit";
import PinPost from "@/components/posts/pin";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { Pin } from "lucide-react";
import Link from "next/link";

export default async function PostPage({ params: { id } }: { params: { id: string } }) {
    const { post, comments } = await getPost(id);
    const currentUser = getCurrentUser();
    const canEdit = currentUser && (currentUser.id === post.author_id || currentUser.role === "ROLE_ROOT");
    const canDelete =
        currentUser &&
        (currentUser.id === post.author_id || currentUser.role === "ROLE_ROOT" || currentUser.role === "ROLE_ADMIN");
    const canPin = currentUser && (currentUser.role === "ROLE_ROOT" || currentUser.role === "ROLE_ADMIN");

    return (
        <div className="flex flex-col">
            <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-5 mb-5">
                <h1 className="text-3xl font-semibold">
                    {post.pinned && (
                        <div className="inline-block pr-2">
                            <Pin size="23" />
                        </div>
                    )}
                    {post.title}
                </h1>
            </div>

            <div className="flex flex-col gap-5">
                <div className="whitespace-pre-line">{post.content}</div>
                <Link className="flex gap-2 items-center" href={`/chats/${post.author_id}?referencedPostId=${post.id}`}>
                    <Avatar userId={post.author_id} markerSize={12} avatarSize={32} src={post.author_avatar_url} />
                    {post.author_name}
                </Link>
                {(canPin || canDelete || canEdit) && (
                    <div className="flex gap-4 items-center">
                        {canPin && <PinPost post={post} />}
                        {canEdit && <EditPost post={post} />}
                        {canDelete && <DeletePost post={post} />}
                    </div>
                )}
                <div className="text-sm text-zinc-500">Created at {new Date(post.created_at).toLocaleString()}</div>
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
