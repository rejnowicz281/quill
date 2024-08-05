import getAuthorRequests from "@/action/admin/author-requests/read/get-all";
import AuthorRequestsList from "@/components/admin/author-requests/list";

export default async function AdminPage() {
    const authorRequests = await getAuthorRequests();

    return <AuthorRequestsList requests={authorRequests} />;
}
