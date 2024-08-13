"use client";

import useStomp from "@/lib/hooks/use-stomp";
import { CompatClient } from "@stomp/stompjs";
import { ReactNode, createContext, useContext } from "react";

const StompContext = createContext<{
    sendRefreshTo: (receiverId: string) => void;
    subscribeToRefresh: () => void;
    stompClient: CompatClient | null;
    unsubscribeFromRefresh: () => void;
} | null>(null);

export function StompProvider({ children }: { children: ReactNode }) {
    const { sendRefreshTo, subscribeToRefresh, unsubscribeFromRefresh, stompClient } = useStomp();

    return (
        <StompContext.Provider
            value={{
                subscribeToRefresh,
                sendRefreshTo,
                stompClient,
                unsubscribeFromRefresh
            }}
        >
            {children}
        </StompContext.Provider>
    );
}

export default function useStompContext() {
    const context = useContext(StompContext);

    if (!context) throw new Error("useStompContext must be used within a StompContext Provider");

    return context;
}
