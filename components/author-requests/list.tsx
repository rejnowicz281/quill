import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthorRequest } from "@/lib/types/author-request";
import CreateAuthorRequest from "./create";
import DeleteAuthorRequest from "./delete";
import EditAuthorRequest from "./edit";

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
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-xl">Your Request{requests.length > 1 ? "s" : ""}</h2>
                <p className="text-gray-500 dark:text-gray-400">{header}</p>
            </div>
            {requests.map((request) => (
                <Card key={request.id}>
                    <CardHeader>
                        <CardTitle className="underline">{request.status}</CardTitle>
                        <CardDescription className="flex flex-col">
                            <span>Requested {new Date(request.created_at).toLocaleString()}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>{request.details}</CardContent>
                    <CardFooter className="gap-2">
                        {request.status === "REJECTED" || request.status === "ACCEPTED" ? null : (
                            <EditAuthorRequest request={request} />
                        )}
                        <DeleteAuthorRequest id={request.id} />
                    </CardFooter>
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
