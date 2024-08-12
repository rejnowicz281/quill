import Avatar from "@/components/general/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Comment } from "@/lib/types/post/comment";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
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
            {canEdit && <EditComment comment={comment} />}
            {canDelete && <DeleteComment comment={comment} />}
            <CardHeader className="underline">
                <CardTitle className="flex gap-2 items-center">
                    <Avatar userId={comment.user_id} avatarSize={32} src={comment.user_avatar_url} />
                    {comment.user_name}
                </CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-line">{comment.content}</CardContent>
            <CardFooter className="border-t pt-6 text-sm flex-col items-start">
                <div>Created at {new Date(comment.created_at).toLocaleString()}</div>
            </CardFooter>
        </Card>
    );
}
