export type Message = {
    id: string;
    content: string;
    created_at: string;
    sender_id: string;
    referenced_post_id: string;
    referenced_post_title: string;
    timestamp?: boolean;
};
