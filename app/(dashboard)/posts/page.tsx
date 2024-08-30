import getAllPosts from "@/action/posts/read/get-all";
import PageTitle from "@/components/general/page-title";
import PostCard from "@/components/posts/card";
import { Button } from "@/components/ui/button";
import { shallowAuthorize } from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { Plus, User } from "lucide-react";
import Link from "next/link";

export default async function PostsPage() {
    const posts = await getAllPosts();

    const user = getCurrentUser();

    if (!user) return null;

    const canPin = shallowAuthorize("ROLE_ADMIN", user.role);
    const canCreatePost = shallowAuthorize("ROLE_AUTHOR", user.role);

    return (
        <div className="py-8">
            <PageTitle>Homepage</PageTitle>

            {user.role === "ROLE_USER" && (
                <Button
                    asChild
                    variant="ghost"
                    className="inline-flex flex-row gap-2 items-center border rounded-2xl mb-8"
                >
                    <Link href={`/author-requests`}>
                        <User />
                        <div>Become An Author</div>
                    </Link>
                </Button>
            )}
            {canCreatePost && (
                <Button
                    asChild
                    variant="ghost"
                    className="inline-flex flex-row gap-2 items-center border rounded-2xl mb-8"
                >
                    <Link href={`/posts/create`}>
                        <Plus />
                        <div>Create Post</div>
                    </Link>
                </Button>
            )}

            <div className="flex flex-col gap-4">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} canPin={canPin} />
                ))}
            </div>
        </div>
    );
}
