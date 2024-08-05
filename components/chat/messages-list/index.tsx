"use client";

import { Message } from "@/lib/types/chat";
import { MinimalUser } from "@/lib/types/user";
import formatMessageDate from "@/lib/utils/general/format-message-date";
import { cn } from "@/lib/utils/general/shadcn";
import { Fragment, useEffect, useRef } from "react";
import MessageContainer from "./message-container";

export default function MessagesList({ messages, chatter }: { messages: Message[]; chatter: MinimalUser }) {
    const messagesRef = useRef<HTMLDivElement>(null);
    const previousMessageCount = useRef(0);

    useEffect(() => {
        if (messages && messagesRef.current) {
            const container = messagesRef.current;
            const currentMessageCount = messages.length;

            // Scroll down only if a new message is added
            if (currentMessageCount > previousMessageCount.current) {
                const lastMessage = container.lastElementChild;
                if (lastMessage) lastMessage.scrollIntoView({ behavior: "smooth" });
            }

            previousMessageCount.current = currentMessageCount;
        }
    }, [messages]);

    return (
        <div className="relative flex-1 flex flex-col">
            {messages.length > 0 ? (
                <div ref={messagesRef} className="p-4 absolute inset-0 overflow-auto flex flex-col flex-1">
                    {messages.map((message, idx) => (
                        <Fragment key={message.id}>
                            {message.timestamp && (
                                <div className={cn(idx !== 0 && "mt-4", "text-center text-neutral-600")}>
                                    {formatMessageDate(message.created_at)}
                                </div>
                            )}
                            <MessageContainer
                                chatter={chatter}
                                message={message}
                                previousMessageCreatedDate={
                                    idx > 0 && messages[idx - 1].sender_id === message.sender_id
                                        ? messages[idx - 1].created_at
                                        : null
                                }
                                nextMessageCreatedDate={
                                    idx < messages.length - 1 && messages[idx + 1].sender_id === message.sender_id
                                        ? messages[idx + 1].created_at
                                        : null
                                }
                            />
                        </Fragment>
                    ))}
                </div>
            ) : (
                <div className="p-4 flex-1 flex justify-center items-center font-semibold text-center">
                    <p>This chat is empty... How about writing a message?</p>
                </div>
            )}
        </div>
    );
}
