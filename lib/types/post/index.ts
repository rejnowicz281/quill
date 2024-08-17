export type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    author_id: string;
    author_name: string;
    author_avatar_url: string;
    pinned?: boolean;
};

export type BasicPost = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    pinned?: boolean;
};

export type MinimalPost = {
    id: string;
    title: string;
    created_at: string;
};
