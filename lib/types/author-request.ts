export type AuthorRequest = {
    id: string;
    details: string;
    created_at: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
};

export type AuthorRequestWithUser = AuthorRequest & {
    user_id: string;
    user_name: string;
};
