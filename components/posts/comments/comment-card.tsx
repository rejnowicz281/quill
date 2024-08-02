import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Comment } from "@/lib/types/comment";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import EditComment from "./edit-comment";

export default function CommentCard({ comment }: { comment: Comment }) {
    const currentUser = getCurrentUser();
    const isOwner = currentUser && currentUser.id === comment.user_id;

    return (
        <Card>
            {isOwner && <EditComment comment={comment} />}
            <CardHeader className="underline">
                <CardTitle>{comment.user_name}</CardTitle>
            </CardHeader>
            <CardContent>{comment.content}</CardContent>
            <CardFooter className="border-t pt-6 text-sm flex-col items-start">
                <div>Created at {new Date(comment.created_at).toLocaleString()}</div>
            </CardFooter>
        </Card>
    );
}
