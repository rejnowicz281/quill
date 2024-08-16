"use client";

import logout from "@/action/auth/modify/logout";
import CurrentUserAvatar from "@/components/general/avatar/current-user-avatar";
import PageTitle from "@/components/general/page-title";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { usePresenceContext } from "@/providers/presence-provider";

export default function SettingsPage() {
    const { togglePresence, presenceEnabled } = usePresenceContext();

    return (
        <div>
            <PageTitle>Settings</PageTitle>
            <div className="flex flex-col gap-8 items-start">
                <form action={logout}>
                    <Button asChild variant="secondary">
                        <SubmitButton content="Logout" />
                    </Button>
                </form>
                <Button className="flex gap-2 items-start" variant="outline" onClick={togglePresence}>
                    <CurrentUserAvatar avatarSize={25} markerSize={10} />
                    {presenceEnabled ? "Disable" : "Enable"} Presence
                </Button>
            </div>
        </div>
    );
}
