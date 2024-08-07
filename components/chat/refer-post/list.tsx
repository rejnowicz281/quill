import getUserPosts from "@/action/posts/read/get-user-posts/server";
import { MinimalPost } from "@/lib/types/post";
import { useQuery } from "@tanstack/react-query";

export default function PostReferralList({
    userId,
    afterChoice
}: {
    userId: string;
    afterChoice: (referredPost: MinimalPost) => void;
}) {
    const { data, isFetching, isSuccess } = useQuery({
        queryKey: ["referralPosts", { userId }],
        queryFn: () => getUserPosts(userId),
        refetchOnMount: true
    });

    return (
        <div className="flex flex-col gap-2">
            {isFetching && <div>Loading...</div>}
            {isSuccess &&
                data?.map((post) => (
                    <button
                        onClick={() => {
                            afterChoice(post);
                        }}
                        key={post.id}
                        className="flex flex-col rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700/70"
                    >
                        <div>{post.title}</div>
                        <div className="text-sm text-gray-500">
                            Created {new Date(post.created_at).toLocaleString()}
                        </div>
                    </button>
                ))}
        </div>
    );
}
