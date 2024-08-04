"use client";

import DeleteAuthorRequest from "@/components/author-requests/delete";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthorRequestWithUser } from "@/lib/types/author-request";
import ApproveAuthorRequest from "./approve";
import RejectAuthorRequest from "./reject";

export default function AuthorRequestsList({ requests }: { requests: AuthorRequestWithUser[] }) {
    const somePending = requests.some((request) => request.status === "PENDING");

    return (
        <div className="flex flex-col gap-4">
            <div>
                {requests.length > 0 && somePending
                    ? "There are author requests waiting for a review."
                    : "There are no author requests to review at the moment."}
            </div>
            {requests.map((request) => (
                <Card key={request.id}>
                    <DeleteAuthorRequest id={request.id} />
                    <CardHeader>
                        <CardTitle>
                            <span className="underline">{request.status}</span>
                            {request.status !== "PENDING" && " - Safe To Delete"}
                        </CardTitle>
                        <CardDescription>From {request.user_name}</CardDescription>
                    </CardHeader>
                    <CardContent>{request.details}</CardContent>
                    <CardFooter className="justify-between">
                        <div>{new Date(request.created_at).toLocaleString()}</div>
                        {request.status !== "ACCEPTED" && request.status !== "REJECTED" && (
                            <div className="flex">
                                <RejectAuthorRequest requestId={request.id} userName={request.user_name} />
                                <ApproveAuthorRequest
                                    requestId={request.id}
                                    userId={request.user_id}
                                    userName={request.user_name}
                                />
                            </div>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
