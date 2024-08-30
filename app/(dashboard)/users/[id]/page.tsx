import getUser from "@/action/users/read/get-user";
import Avatar from "@/components/general/avatar";
import PostCard from "@/components/posts/card";
import { Button } from "@/components/ui/button";
import { shallowAuthorize } from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import roleToFriendlyName from "@/lib/utils/auth/role-to-friendly-name";
import { MessageCircleReply } from "lucide-react";
import Link from "next/link";

export default async function UserPage({ params: { id } }: { params: { id: string } }) {
    const { user, posts } = await getUser(id);

    const currentRole = getCurrentUser()?.role;

    if (!currentRole) return null;

    const canPin = shallowAuthorize("ROLE_ADMIN", currentRole);

    return (
        <div className="py-8">
            <div className="flex flex-col justify-center items-center gap-3 pb-6">
                <Avatar avatarSize={100} markerSize={25} src={user.avatar_url} userId={id} />
                <div>
                    <span>{user.name}</span>{" "}
                    <span className="text-sm text-zinc-500">/ {roleToFriendlyName(user.role)}</span>
                </div>
                <div className="font-semibold">{user.email}</div>
                <div className="text-zinc-500">Member since {new Date(user.created_at).toLocaleDateString()}</div>
                <Button className="flex items-center gap-2" asChild variant="link">
                    <Link href={`/chats/${user.id}`}>
                        <MessageCircleReply />
                        Contact
                    </Link>
                </Button>
            </div>
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={{ ...post, author_id: user.id, author_name: user.name, author_avatar_url: user.avatar_url }}
                    canPin={canPin}
                />
            ))}
        </div>
    );
}
