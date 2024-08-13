"use client";

import useAuthContext from "@/providers/auth-provider";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";

export default function useStomp() {
    const [stompClient, setStompClient] = useState<CompatClient | null>(null);
    const router = useRouter();
    const { user } = useAuthContext();

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = Stomp.over(socket);

        client.connect(
            {},
            () => {
                setStompClient(client);
            },
            () => {
                console.error("Error connecting to WebSocket");
            }
        );

        return () => {
            if (stompClient) {
                stompClient.disconnect();
                setStompClient(null);
            }
        };
    }, []);

    const subscribeToRefresh = () => {
        if (stompClient) {
            stompClient.subscribe(`/topic/receiveRefreshAs/${user.id}`, () => {
                router.refresh();
            });
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    const unsubscribeFromRefresh = () => {
        if (stompClient) {
            stompClient.unsubscribe(`/topic/receiveRefreshAs/${user.id}`);
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    const sendRefreshTo = (receiverId: string) => {
        if (stompClient && receiverId !== user.id) {
            stompClient.send(`/app/sendRefreshTo/${receiverId}`);
        } else {
            console.error("Stomp client is not connected.");
        }
    };

    return { sendRefreshTo, subscribeToRefresh, stompClient, unsubscribeFromRefresh };
}
