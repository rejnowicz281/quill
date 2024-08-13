"use client";

import useStompContext from "@/providers/stomp-provider";
import { ReactNode, useEffect } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
    const { subscribeToRefresh, stompClient, unsubscribeFromRefresh } = useStompContext();

    useEffect(() => {
        subscribeToRefresh();

        return () => unsubscribeFromRefresh();
    }, [stompClient]);

    return <>{children}</>;
}
