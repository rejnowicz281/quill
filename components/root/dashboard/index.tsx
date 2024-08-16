import PageTitle from "@/components/general/page-title";
import { BasicUser } from "@/lib/types/user";
import AdminsList from "./admins/list";

export default function RootDashboard({ admins }: { admins: BasicUser[] }) {
    return (
        <div>
            <PageTitle>ROOT Dashboard</PageTitle>
            <div className="flex flex-col gap-8">
                <AdminsList admins={admins} />
            </div>
        </div>
    );
}
