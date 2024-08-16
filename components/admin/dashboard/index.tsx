import PageTitle from "@/components/general/page-title";
import { AuthorRequestWithUser } from "@/lib/types/author-request";
import { BasicUser } from "@/lib/types/user";
import AuthorRequestsList from "./author-requests/list";
import AuthorsList from "./authors/list";

export default function AdminDashboard({
    authorRequests,
    authors
}: {
    authorRequests: AuthorRequestWithUser[];
    authors: BasicUser[];
}) {
    return (
        <div>
            <PageTitle>Admin Dashboard</PageTitle>
            <div className="flex flex-col gap-8">
                <AuthorRequestsList requests={authorRequests} />

                <AuthorsList authors={authors} />
            </div>
        </div>
    );
}
