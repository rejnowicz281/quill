import adminDashboardQuery from "@/action/admin/dashboard/dashboard-query";
import AdminDashboard from "@/components/admin/dashboard";

export default async function AdminPage() {
    const { authorRequests, authors } = await adminDashboardQuery();

    return <AdminDashboard authorRequests={authorRequests} authors={authors} />;
}
