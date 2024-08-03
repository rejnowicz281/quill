"use client";

import useAuthContext from "@/providers/auth-provider";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";

export default function useRefreshBroadcast() {
    const stompClientRef = useRef<CompatClient | null>(null);
    const router = useRouter();
    const { user } = useAuthContext();

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = Stomp.over(socket);

        client.connect(
            {},
            () => {
                client.subscribe(`/topic/receiveRefreshAs/${user.id}`, () => {
                    router.refresh();
                });

                stompClientRef.current = client;
            },
            () => {
                console.error("Error connecting to WebSocket");
            }
        );

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
                stompClientRef.current = null;
            }
        };
    }, []);

    const sendRefreshTo = (receiverId: string) => {
        if (stompClientRef.current) {
            stompClientRef.current.send(`/app/sendRefreshTo/${receiverId}`);
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    return { sendRefreshTo };
}
