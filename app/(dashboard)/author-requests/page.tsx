import getAuthorRequests from "@/action/author-requests/read/get-author-requests";
import AuthorRequestForm from "@/components/author-requests/form";
import AuthorRequestsList from "@/components/author-requests/list";

export default async function AuthorRequestsPage() {
    const authorRequests = await getAuthorRequests();

    return authorRequests.length > 0 ? <AuthorRequestsList requests={authorRequests} /> : <AuthorRequestForm />;
}
