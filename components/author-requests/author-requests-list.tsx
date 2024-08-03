import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthorRequest } from "@/lib/types/author-request";
import CreateAuthorRequest from "./create-author-request";
import DeleteAuthorRequest from "./delete-author-request";
import EditAuthorRequest from "./edit-author-request";

export default function AuthorRequestsList({ requests }: { requests: AuthorRequest[] }) {
    const allRejected = requests.every((request) => request.status === "REJECTED");

    const header = (() => {
        if (requests.length === 1) {
            return allRejected
                ? "Your request was rejected. You can delete it now."
                : "Your request will soon be reviewed by our team. You can edit or delete it at any time.";
        } else {
            return allRejected
                ? "All of your requests were rejected. You can delete them now."
                : "Here you can see all of your requests. You can edit or delete them at any time.";
        }
    })();

    return (
        <div className="flex flex-col gap-4">
            <div>{header}</div>
            {requests.map((request) => (
                <Card key={request.id}>
                    {request.status === "REJECTED" || request.status === "ACCEPTED" ? null : (
                        <EditAuthorRequest request={request} />
                    )}
                    <DeleteAuthorRequest id={request.id} />
                    <CardHeader>
                        <CardTitle className="underline">{request.status}</CardTitle>
                        <CardDescription>{request.details}</CardDescription>
                    </CardHeader>
                    <CardFooter>{new Date(request.created_at).toLocaleString()}</CardFooter>
                </Card>
            ))}
            {allRejected && (
                <div className="flex flex-col items-center gap-6 text-gray-500">
                    <div>You have no pending requests. Feel free to submit a new one.</div>
                    <CreateAuthorRequest />
                </div>
            )}
        </div>
    );
}
