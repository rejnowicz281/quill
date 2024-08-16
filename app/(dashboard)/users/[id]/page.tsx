import getUser from "@/action/users/read/get-user";
import Avatar from "@/components/general/avatar";
import PageTitle from "@/components/general/page-title";
import roleToFriendlyName from "@/lib/utils/auth/role-to-friendly-name";

export default async function UserPage({ params: { id } }: { params: { id: string } }) {
    const user = await getUser(id);

    return (
        <div>
            <PageTitle>
                <div className="flex items-center gap-3">
                    <Avatar src={user.avatar_url} userId={id} />
                    {user.name}
                </div>
            </PageTitle>
            <div className="text-zinc-500 text-sm">{user.email}</div>
            <div className="text-zinc-500 text-sm">{roleToFriendlyName(user.role)}</div>
            <div className="text-zinc-500 text-sm">Member since {new Date(user.created_at).toLocaleDateString()}</div>
        </div>
    );
}
