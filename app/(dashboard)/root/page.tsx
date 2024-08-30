import rootDashboardQuery from "@/action/root/dashboard/dashboard-query";
import PageTitle from "@/components/general/page-title";
import AdminsList from "@/components/root/admins/list";

export default async function RootPage() {
    const admins = await rootDashboardQuery();

    return (
        <div>
            <PageTitle>ROOT Dashboard</PageTitle>
            <div className="flex flex-col gap-8">
                <AdminsList admins={admins} />
            </div>
        </div>
    );
}
