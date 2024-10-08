import getAllContacts from "@/action/chat/read/get-all-contacts";
import AddContactButton from "@/components/chat/add-contact-button";
import Avatar from "@/components/general/avatar";
import PageTitle from "@/components/general/page-title";
import { UserContact } from "@/lib/types/chat";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import timePassedSinceDate from "@/lib/utils/general/time-passed-since-date";
import Link from "next/link";

export default async function ChatsPage() {
    const contacts = await getAllContacts();

    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    const mostRecentMessageSection = (chat: UserContact) => {
        const senderId = chat.last_message_sender_id;
        const prefix = senderId === currentUser.id ? "You: " : "";
        const timePassed = timePassedSinceDate(chat.last_message_created_at);

        return (
            <div className="truncate flex flex-row text-gray-500 gap-1">
                <div className="truncate">{`${prefix}${chat.last_message_content}`}</div>
                <div>·</div>
                <div>{timePassed}</div>
            </div>
        );
    };

    return (
        <div className="py-8">
            <PageTitle>Chat</PageTitle>
            <div>
                <AddContactButton />

                <div className="pt-8 flex flex-col">
                    {contacts.map((chat) => (
                        <Link
                            className="rounded-md flex items-center p-4 justify-between gap-4 hover:bg-neutral-300 dark:hover:bg-neutral-700/70"
                            href={`/chats/${chat.id}`}
                            key={chat.id}
                        >
                            <div className="truncate flex items-center gap-3">
                                <Avatar userId={chat.id} src={chat.avatar_url} />
                                <div className="truncate flex flex-col">
                                    <div className="truncate">{chat.name}</div>
                                    {mostRecentMessageSection(chat)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
