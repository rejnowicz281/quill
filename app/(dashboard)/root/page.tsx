import rootDashboardQuery from "@/action/root/dashboard/dashboard-query";
import RootDashboard from "@/components/root/dashboard";

export default async function RootPage() {
    const admins = await rootDashboardQuery();

    return <RootDashboard admins={admins} />;
}
