"use client";

import getFilteredUsers from "@/action/users/read/get-filtered-users/server";
import Avatar from "@/components/general/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/lib/hooks/use-debounce";
import { MinimalUser } from "@/lib/types/user";
import roleToFriendlyName from "@/lib/utils/auth/role-to-friendly-name";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MainContent({ closeDialog }: { closeDialog: () => void }) {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<MinimalUser[]>([]);

    useEffect(() => {
        const populateUsers = async () => {
            if (searchQuery.length === 0) {
                setUsers([]);
                return;
            }

            setLoading(true);
            const users = await getFilteredUsers(debouncedSearch.trim());
            setLoading(false);

            if (users) setUsers(users);
        };

        populateUsers();
    }, [debouncedSearch]);

    return (
        <div className="flex flex-col relative gap-5">
            <input
                type="text"
                placeholder="Search for a user..."
                className="border z-10 sticky top-0 right-0 left-0 border-gray-200 rounded-2xl p-3 outline-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-col gap-5">
                {loading ? (
                    <div className="flex items-center gap-2">
                        <Skeleton className="rounded-full w-[50px] h-[50px]" />
                        <Skeleton className="rounded-lg h-[35px] w-[100px]" />
                    </div>
                ) : (
                    users.map((user) => (
                        <Link
                            onClick={closeDialog}
                            href={`/chats/${user.id}`}
                            className="group flex items-center gap-2 group"
                        >
                            <Avatar userId={user.id} src={user.avatar_url} />
                            <div className="rounded-lg p-2 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700/70">
                                <div>{user.name}</div>
                                <div className="text-gray-500">{roleToFriendlyName(user.role)}</div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
