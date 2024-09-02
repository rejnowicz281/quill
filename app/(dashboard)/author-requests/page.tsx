import getAuthorRequests from "@/action/author-requests/read/get-all";
import AuthorRequestForm from "@/components/author-requests/form";
import AuthorRequestsList from "@/components/author-requests/list";
import PageTitle from "@/components/general/page-title";

export default async function AuthorRequestsPage() {
    const authorRequests = await getAuthorRequests();

    return (
        <div className="flex flex-col flex-1 py-8">
            <PageTitle>Become an author</PageTitle>
            {authorRequests.length > 0 ? <AuthorRequestsList requests={authorRequests} /> : <AuthorRequestForm />}
        </div>
    );
}
