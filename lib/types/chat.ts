import { MinimalUser } from "./user";

export type Chat = {
    user: MinimalUser;
    messages: Message[];
};

export type Message = {
    id: string;
    content: string;
    created_at: string;
    sender_id: string;
    referenced_post_id: string;
    referenced_post_title: string;
    timestamp?: boolean;
};

export type UserContact = {
    id: string;
    name: string;
    last_message_content: string;
    last_message_created_at: string;
    last_message_sender_id: string;
    last_message_sender_name: string;
};
