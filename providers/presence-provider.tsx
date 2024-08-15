"use client";

import usePresence from "@/lib/hooks/use-presence";
import { ReactNode, createContext, useContext } from "react";

const PresenceContext = createContext<{
    loggedUsers: Set<string>;
    isLoggedIn: (userId: string) => boolean;
    presenceEnabled: boolean;
    togglePresence: () => void;
} | null>(null);

export default function PresenceProvider({ children }: { children: ReactNode }) {
    const { loggedUsers, isLoggedIn, presenceEnabled, togglePresence } = usePresence();

    return (
        <PresenceContext.Provider
            value={{
                loggedUsers,
                isLoggedIn,
                presenceEnabled,
                togglePresence
            }}
        >
            {children}
        </PresenceContext.Provider>
    );
}

export const usePresenceContext = () => {
    const context = useContext(PresenceContext);

    if (!context) throw new Error("usePresenceContext must be used within a PresenceContext Provider");

    return context;
};
