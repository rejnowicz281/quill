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
        <div className="flex-1 flex justify-center">
            <div className="py-12 px-7 max-w-[850px] w-full">
                <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4 mb-8">
                    <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
                </div>
                <div className="flex flex-col gap-8">
                    <AuthorRequestsList requests={authorRequests} />

                    <AuthorsList authors={authors} />
                </div>
            </div>
        </div>
    );
}
