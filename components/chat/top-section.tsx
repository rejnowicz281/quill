import Avatar from "@/components/general/avatar";
import { MinimalUser } from "@/lib/types/user/minimal-user";
import roleToFriendlyName from "@/lib/utils/auth/role-to-friendly-name";

export default function TopSection({ receiver }: { receiver: MinimalUser }) {
    return (
        <div className="truncate flex border-b pb-4 justify-center items-center gap-3 group">
            <Avatar avatarSize={50} markerSize={12} src={"https://placehold.co/50/png"} userId={receiver.id} />

            <div className="truncate flex flex-col justify-evenly">
                <div className="truncate">{receiver.name}</div>
                <div className="truncate text-gray-500">{roleToFriendlyName(receiver.role)}</div>
            </div>
        </div>
    );
}
