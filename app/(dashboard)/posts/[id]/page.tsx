import getPost from "@/action/posts/read/get-post";
import PostCard from "@/components/posts/card";
import CommentCard from "@/components/posts/comments/comment-card";
import CommentForm from "@/components/posts/comments/form";

export default async function PostPage({ params: { id } }: { params: { id: string } }) {
    const { post, comments } = await getPost(id);

    return (
        <div className="flex flex-col p-4 gap-4">
            <PostCard post={post} />

            <h2 className="text-xl">Comments</h2>
            <CommentForm postId={id} />
            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
