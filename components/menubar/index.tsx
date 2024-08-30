import { shallowAuthorize } from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { Home, MessageCircleMore, Settings, ShieldCheck, ShieldPlus, User } from "lucide-react";
import NavButton from "./nav-button";

export default function Menubar() {
    const user = getCurrentUser();

    if (!user) return null;

    const isAdmin = shallowAuthorize("ROLE_ADMIN", user.role);
    const isRoot = shallowAuthorize("ROLE_ROOT", user.role);

    return (
        <div className="flex-1 flex md:flex-col gap-4 items-center justify-center bg-zinc-100/40 dark:bg-zinc-900 md:bg-inherit md:dark:bg-inherit border-t border-t-neutral-300 md:border-t-0 dark:border-t-neutral-800 p-2">
            <NavButton icon={<Home />} href="/posts" />
            <NavButton icon={<MessageCircleMore />} href="/chats" />
            <NavButton icon={<User />} href={`/users/${user.id}`} />
            <NavButton icon={<Settings />} href="/settings" />
            {isAdmin && <NavButton icon={<ShieldCheck />} href="/admin" />}
            {isRoot && <NavButton icon={<ShieldPlus />} href="/root" />}
        </div>
    );
}
