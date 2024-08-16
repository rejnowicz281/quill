import Avatar from "@/components/general/avatar";
import { MinimalUser } from "@/lib/types/user";
import roleToFriendlyName from "@/lib/utils/auth/role-to-friendly-name";
import Link from "next/link";

export default function TopSection({ receiver }: { receiver: MinimalUser }) {
    return (
        <Link
            href={`/users/${receiver.id}`}
            className="truncate flex border-b pb-6 justify-center items-center gap-3 group"
        >
            <Avatar avatarSize={50} src={receiver.avatar_url} userId={receiver.id} />

            <div className="truncate flex flex-col justify-evenly">
                <div className="truncate">{receiver.name}</div>
                <div className="truncate text-gray-500">{roleToFriendlyName(receiver.role)}</div>
            </div>
        </Link>
    );
}
