import getUserPosts from "@/action/posts/read/get-user-posts/server";
import { MinimalPost } from "@/lib/types/post";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

export default function PostReferralList({
    userId,
    afterChoice,
    shouldRefetch
}: {
    userId: string;
    afterChoice: (referredPost: MinimalPost) => void;
    shouldRefetch: boolean;
}) {
    const { isFetching, isSuccess, data, refetch } = useQuery({
        queryKey: ["referralPosts", userId],
        queryFn: () => getUserPosts(userId),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: !shouldRefetch
    });

    useEffect(() => {
        if (shouldRefetch) refetch();
    }, [shouldRefetch]);

    return (
        <div className="flex flex-col gap-2">
            {isFetching && <LoaderCircle className="self-center animate-spin" />}
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
