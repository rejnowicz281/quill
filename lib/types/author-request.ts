export type AuthorRequest = {
    id: string;
    details: string;
    created_at: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
};
