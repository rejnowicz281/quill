import getChat from "@/action/chat/read/get-chat";
import CreateMessage from "@/components/chat/create-message";
import MessagesList from "@/components/chat/messages-list";
import TopSection from "@/components/chat/top-section";

export default async function ChatPage({ params: { id } }: { params: { id: string } }) {
    const chat = await getChat(id);

    if (!chat) return null;

    return (
        <div className="flex flex-col flex-1 relative">
            <TopSection receiver={chat.user} />
            <MessagesList messages={chat.messages} chatter={chat.user} />
            <CreateMessage receiverId={id} />
        </div>
    );
}
