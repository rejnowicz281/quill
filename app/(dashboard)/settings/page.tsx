"use client";

import logout from "@/action/auth/modify/logout";
import CurrentUserAvatar from "@/components/general/avatar/current-user-avatar";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { usePresenceContext } from "@/providers/presence-provider";

export default function SettingsPage() {
    const { togglePresence, presenceEnabled } = usePresenceContext();

    return (
        <div className="flex flex-col gap-4">
            <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-4">
                <h2 className="text-xl font-semibold">Account</h2>
                <p className="text-gray-500">Manage your account settings</p>
            </div>

            <div className="flex flex-col gap-12">
                <div className="flex flex-col items-start gap-4">
                    <div>
                        <h3 className="font-semibold">Logout</h3>
                        <p className="text-gray-500 text-sm">Log out of your account and return to the login screen</p>
                    </div>
                    <form action={logout}>
                        <Button asChild variant="secondary">
                            <SubmitButton content="Logout" />
                        </Button>
                    </form>
                </div>
                <div className="flex flex-col items-start gap-4">
                    <div>
                        <h3 className="font-semibold">Toggle Presence</h3>
                        <p className="text-gray-500 text-sm">
                            {presenceEnabled ? "Disable" : "Enable"} presence to {presenceEnabled ? "hide" : "show"}{" "}
                            your online status {presenceEnabled ? "from" : "to"} others
                        </p>
                    </div>
                    <Button className="flex gap-2 items-start" variant="outline" onClick={togglePresence}>
                        <CurrentUserAvatar avatarSize={25} markerSize={10} />
                        {presenceEnabled ? "Disable" : "Enable"} Presence
                    </Button>
                </div>
            </div>
        </div>
    );
}
