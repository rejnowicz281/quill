"use client";

import CurrentUserAvatar from "@/components/general/avatar/current-user-avatar";
import { Button } from "@/components/ui/button";
import { usePresenceContext } from "@/providers/presence-provider";

export default function SettingsPage() {
    const { togglePresence, presenceEnabled } = usePresenceContext();

    return (
        <div className="flex-1 flex justify-center">
            <div className="py-12 px-7 max-w-[850px] w-full">
                <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-8">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="flex flex-col gap-8">
                    <CurrentUserAvatar />
                    <Button onClick={togglePresence}>{presenceEnabled ? "Disable" : "Enable"} Presence</Button>
                </div>
            </div>
        </div>
    );
}
