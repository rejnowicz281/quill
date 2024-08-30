import adminDashboardQuery from "@/action/admin/dashboard/dashboard-query";
import AuthorRequestsList from "@/components/admin/author-requests/list";
import AuthorsList from "@/components/admin/authors/list";
import PageTitle from "@/components/general/page-title";

export default async function AdminPage() {
    const { authorRequests, authors } = await adminDashboardQuery();

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
