import { Comment } from "./comment";

export type Post = {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    author_name: string;
};

export type PostWithComments = Post & {
    comments: Comment[];
};
