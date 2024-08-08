import deleteMessage from "@/action/chat/modify/delete";
import Avatar from "@/components/general/avatar";
import SubmitButton from "@/components/general/submit-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Message } from "@/lib/types/chat";
import { MinimalUser } from "@/lib/types/user";
import formatMessageDate from "@/lib/utils/general/format-message-date";
import { cn } from "@/lib/utils/general/shadcn";
import useAuthContext from "@/providers/auth-provider";
import useRefreshBroadcastContext from "@/providers/refresh-broadcast-provider";
import { CornerUpLeft, LoaderCircle, Trash } from "lucide-react";
import Link from "next/link";

export default function MessageContainer({
    chatter,
    message,
    previousMessageCreatedDate,
    nextMessageCreatedDate
}: {
    chatter: MinimalUser;
    message: Message;
    previousMessageCreatedDate: string | null;
    nextMessageCreatedDate: string | null;
}) {
    const { user } = useAuthContext();
    const { sendRefreshTo } = useRefreshBroadcastContext();

    const isSender = message.sender_id === user.id;

    function isContinuation(date: string | null) {
        const timeSincePreviousMessage = date
            ? Math.abs(new Date(message.created_at).getTime() - new Date(date).getTime())
            : null;

        // if date given is less than a minute from this message, it is a continuation of this message
        return timeSincePreviousMessage ? timeSincePreviousMessage < 60000 : false;
    }

    const previousMessageContinuation = isContinuation(previousMessageCreatedDate);

    const nextMessageContinuation = isContinuation(nextMessageCreatedDate);

    const showAvatar = !isSender && !nextMessageContinuation;

    return (
        <div
            className={cn(
                previousMessageContinuation ? "mt-1" : "mt-4",
                "group flex gap-4",
                isSender ? "flex-row-reverse" : "flex-row"
            )}
        >
            <TooltipProvider>
                {showAvatar && (
                    <Tooltip>
                        <TooltipContent>{chatter.name}</TooltipContent>
                        <TooltipTrigger asChild>
                            <div className="self-end">
                                <Avatar
                                    avatarSize={40}
                                    src={"https://placehold.co/50/png"}
                                    markerSize={12}
                                    userId={message.sender_id}
                                />
                            </div>
                        </TooltipTrigger>
                    </Tooltip>
                )}
                <Tooltip>
                    <TooltipContent>{formatMessageDate(message.created_at)}</TooltipContent>
                    <TooltipTrigger asChild>
                        <div
                            className={cn(
                                "p-2.5 rounded-3xl flex flex-col gap-2 justify-center text-white word-break xl:max-w-[700px]",
                                nextMessageContinuation && (isSender ? "rounded-br-md" : "rounded-bl-md ml-14"),
                                previousMessageContinuation && (isSender ? "rounded-tr-md" : "rounded-tl-md"),
                                isSender ? "bg-blue-500 items-end" : "bg-zinc-600 dark:bg-[rgb(43,43,43)]"
                            )}
                        >
                            {message.referenced_post_id && (
                                <Link
                                    href={`/posts/${message.referenced_post_id}`}
                                    className="self-start hover:underline flex gap-2 text-sm text-zinc-300"
                                >
                                    <CornerUpLeft size="14" />
                                    {message.referenced_post_title}
                                </Link>
                            )}
                            <div>{message.content}</div>
                        </div>
                    </TooltipTrigger>
                </Tooltip>
            </TooltipProvider>
            {isSender && (
                <div className="self-center">
                    <form
                        action={async () => {
                            await deleteMessage(message.id);
                            sendRefreshTo(chatter.id);
                        }}
                    >
                        <input type="hidden" name="id" value={message.id} />
                        <SubmitButton
                            className="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
                            content={<Trash size="15" />}
                            loading={<LoaderCircle size="15" className="animate-spin" />}
                        />
                    </form>
                </div>
            )}
        </div>
    );
}
