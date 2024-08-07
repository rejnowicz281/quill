export type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    author_id: string;
    author_name: string;
    pinned?: boolean;
};

export type MinimalPost = {
    id: string;
    title: string;
    created_at: string;
};
