import useAuthContext from "@/providers/auth-provider";
import Avatar from ".";

export default function CurrentUserAvatar({
    alt,
    avatarSize = 60,
    markerSize = 15
}: {
    alt?: string;
    avatarSize?: number;
    markerSize?: number;
}) {
    const { user } = useAuthContext();

    return <Avatar src={user.avatar_url} userId={user.id} alt={alt} avatarSize={avatarSize} markerSize={markerSize} />;
}
