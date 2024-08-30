import Avatar from "@/components/general/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Comment } from "@/lib/types/post/comment";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { formatPostCreatedDate } from "@/lib/utils/general/date";
import Link from "next/link";
import DeleteComment from "./delete";
import EditComment from "./edit";

export default function CommentCard({ comment }: { comment: Comment }) {
    const currentUser = getCurrentUser();
    const canEdit = currentUser && (currentUser.id === comment.user_id || currentUser.role === "ROLE_ROOT");
    const canDelete =
        currentUser &&
        (currentUser.id === comment.user_id || currentUser.role === "ROLE_ROOT" || currentUser.role === "ROLE_ADMIN");

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <Link className="flex gap-2 items-center" href={`/users/${comment.user_id}`}>
                    <Avatar userId={comment.user_id} markerSize={12} avatarSize={32} src={comment.user_avatar_url} />
                    <div>
                        <div className="font-semibold">{comment.user_name}</div>
                        <div className="text-sm text-gray-400">{formatPostCreatedDate(comment.created_at)}</div>
                    </div>
                </Link>
                <div className="flex">
                    {canEdit && <EditComment comment={comment} />}
                    {canDelete && <DeleteComment comment={comment} />}
                </div>
            </CardHeader>
            <CardContent className="whitespace-pre-line">{comment.content}</CardContent>
        </Card>
    );
}
