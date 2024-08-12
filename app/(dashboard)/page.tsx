import Avatar from "@/components/general/avatar";
import getCurrentUser from "@/lib/utils/auth/get-current-user";

export default function HomePage() {
    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    return (
        <div className="flex items-center flex-col flex-1 gap-6 justify-center">
            <h1 className="text-9xl font-semibold tracking-wide">quill</h1>
            <div className="flex gap-2 items-center">
                <Avatar avatarSize={50} src={currentUser.avatar_url} userId={currentUser.id} />
                <div>
                    <div>{currentUser.name}</div>
                    <div className="text-gray-500">{currentUser.role}</div>
                </div>
            </div>
        </div>
    );
}
