"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import useStompContext from "./stomp-provider";

const PresenceContext = createContext<{
    loggedUsers: Set<string>;
    setLoggedUsers: React.Dispatch<React.SetStateAction<Set<string>>>;
    isLoggedIn: (userId: string) => boolean;
} | null>(null);

export default function PresenceProvider({ children }: { children: ReactNode }) {
    const [loggedUsers, setLoggedUsers] = useState<Set<string>>(new Set());

    const { stompClient } = useStompContext();

    const subscribeToPresence = () => {
        if (stompClient) {
            stompClient.subscribe(`/topic/presence-sync`, (message) => {
                const binaryString = String.fromCharCode.apply(null, Array.from(new Uint8Array(message.binaryBody)));

                const payload = JSON.parse(binaryString);

                setLoggedUsers(new Set(payload));
            });

            stompClient.send("/app/presence-sync");
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    const unsubscribeFromPresence = () => {
        if (stompClient) {
            stompClient.unsubscribe(`/topic/presence-sync`);
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    useEffect(() => {
        subscribeToPresence();

        return () => {
            unsubscribeFromPresence();
        };
    }, [stompClient]);

    const isLoggedIn = (userId: string) => loggedUsers.has(userId);

    return (
        <PresenceContext.Provider
            value={{
                loggedUsers,
                setLoggedUsers,
                isLoggedIn
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
