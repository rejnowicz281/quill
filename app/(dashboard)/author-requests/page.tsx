import getAuthorRequests from "@/action/author-requests/read/get-all";
import AuthorRequestForm from "@/components/author-requests/form";
import AuthorRequestsList from "@/components/author-requests/list";

export default async function AuthorRequestsPage() {
    const authorRequests = await getAuthorRequests();

    return (
        <div className="flex-1 flex justify-center">
            <div className="py-12 px-7 max-w-[850px] w-full flex flex-col gap-8">
                <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-4">
                    <h1 className="text-3xl font-semibold">Become an Author</h1>
                </div>
                {authorRequests.length > 0 ? <AuthorRequestsList requests={authorRequests} /> : <AuthorRequestForm />}
            </div>
        </div>
    );
}
