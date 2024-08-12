import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Comment } from "@/lib/types/post/comment";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import Image from "next/image";
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
                    <Image
                        width={32}
                        height={32}
                        className="rounded-[50%]"
                        src={comment.user_avatar_url}
                        alt={comment.user_id}
                    />
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
