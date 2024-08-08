import { BasicUser } from "@/lib/types/user";
import AdminsList from "./admins/list";

export default function RootDashboard({ admins }: { admins: BasicUser[] }) {
    return (
        <div className="flex-1 flex justify-center">
            <div className="py-12 px-7 max-w-[850px] w-full">
                <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-8">
                    <h1 className="text-3xl font-semibold">ROOT Dashboard</h1>
                </div>
                <div className="flex flex-col gap-8">
                    <AdminsList admins={admins} />
                </div>
            </div>
        </div>
    );
}
