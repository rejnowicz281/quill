import getAuthorRequests from "@/action/author-requests/read/get-author-request";
import AuthorRequestsList from "@/components/author-requests/author-requests-list";
import AuthorRequestForm from "@/components/author-requests/form";

export default async function AuthorRequestsPage() {
    const authorRequests = await getAuthorRequests();

    return authorRequests.length > 0 ? <AuthorRequestsList requests={authorRequests} /> : <AuthorRequestForm />;
}
