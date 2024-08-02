import { Message } from "@/lib/types/chat/message";
import { MinimalUser } from "@/lib/types/user/minimal-user";
import formatMessageDate from "@/lib/utils/general/format-message-date";
import { cn } from "@/lib/utils/general/shadcn";
import { Fragment } from "react";
import MessageContainer from "./message-container";

export default function MessagesList({ messages, chatter }: { messages: Message[]; chatter: MinimalUser }) {
    return (
        <div className="relative flex-1 flex flex-col">
            {messages.length > 0 ? (
                <div className="p-4 absolute inset-0 overflow-auto flex flex-col flex-1">
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
