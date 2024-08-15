"use client";

import useAuthContext from "@/providers/auth-provider";
import useStompContext from "@/providers/stomp-provider";
import { useEffect, useState } from "react";

export default function usePresence() {
    const { stompClient } = useStompContext();
    const [loggedUsers, setLoggedUsers] = useState<Set<string>>(new Set());

    const { user } = useAuthContext();

    const [presenceEnabled, setPresenceEnabled] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;

        const saved = localStorage.getItem(`presenceEnabled-${user.id}`);

        return saved ? JSON.parse(saved) : true;
    });

    const subscribeToPresence = () => {
        if (stompClient) {
            stompClient.subscribe(`/topic/presenceSync`, (message) => {
                const binaryString = String.fromCharCode.apply(null, Array.from(new Uint8Array(message.binaryBody)));

                const payload = JSON.parse(binaryString);

                setLoggedUsers(new Set(payload));
            });
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    const unsubscribeFromPresence = () => {
        if (stompClient) {
            stompClient.unsubscribe(`/topic/presenceSync`);
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    const trackUser = () => {
        if (stompClient) {
            stompClient.send("/app/presence/trackUser/" + user.id);
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    const untrackUser = () => {
        if (stompClient) {
            stompClient.send("/app/presence/untrackUser/" + user.id);
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

    useEffect(() => {
        if (presenceEnabled) trackUser();
        else untrackUser();
    }, [stompClient, presenceEnabled]);

    const isLoggedIn = (userId: string) => loggedUsers.has(userId);

    const togglePresence = () => {
        setPresenceEnabled(!presenceEnabled);
    };

    useEffect(() => {
        localStorage.setItem(`presenceEnabled-${user.id}`, JSON.stringify(presenceEnabled));
    }, [presenceEnabled]);

    return {
        loggedUsers,
        isLoggedIn,
        togglePresence,
        presenceEnabled
    };
}
