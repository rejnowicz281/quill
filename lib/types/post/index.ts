export type Post = {
    id: string;
    title: string;
    content: string;
    created_at: Date;
    author_id: string;
    author_name: string;
    pinned?: boolean;
};

export type PostWritingStyle =
    | "formal"
    | "informal"
    | "professional"
    | "casual"
    | "technical"
    | "creative"
    | "persuasive"
    | "conversational"
    | "storytelling"
    | "knowledgeable"
    | "humorous"
    | "analytical"
    | "inspirational"
    | "educational"
    | "reflective"
    | "persuasive"
    | "minimalist";
