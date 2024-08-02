import Avatar from "@/components/general/avatar";
import { MinimalUser } from "@/lib/types/user/minimal-user";

export default function TopSection({ receiver }: { receiver: MinimalUser }) {
    return (
        <div className="truncate flex justify-center items-center gap-3 group">
            <Avatar avatarSize={50} markerSize={12} src={"https://placehold.co/50/png"} userId={receiver.id} />

            {receiver.name}
        </div>
    );
}
