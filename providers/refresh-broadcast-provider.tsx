"use client";

import useRefreshBroadcast from "@/lib/hooks/use-refresh-broadcast";
import { ReactNode, createContext, useContext } from "react";

const RefreshBroadcastContext = createContext<{ sendRefreshTo: (receiverId: string) => void } | null>(null);

export function RefreshBroadcastProvider({ children }: { children: ReactNode }) {
    const { sendRefreshTo } = useRefreshBroadcast();

    return (
        <RefreshBroadcastContext.Provider
            value={{
                sendRefreshTo
            }}
        >
            {children}
        </RefreshBroadcastContext.Provider>
    );
}

export default function useRefreshBroadcastContext() {
    const context = useContext(RefreshBroadcastContext);

    if (!context) throw new Error("useRefreshBroadcastContext must be used within a RefreshBroadcastContext Provider");

    return context;
}
