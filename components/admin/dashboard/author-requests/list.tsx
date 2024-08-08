"use client";

import DeleteAuthorRequest from "@/components/author-requests/delete";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthorRequestWithUser } from "@/lib/types/author-request";
import ApproveAuthorRequest from "./approve";
import RejectAuthorRequest from "./reject";

export default function AuthorRequestsList({ requests }: { requests: AuthorRequestWithUser[] }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-xl">Author Requests</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {requests.length > 0
                        ? "Users who want to become authors on your blog."
                        : "There are no author requests to review at the moment."}
                </p>
            </div>
            {requests.map((request) => (
                <Card key={request.id}>
                    <CardHeader>
                        <CardTitle>
                            <span className="underline">{request.status}</span>
                            {request.status !== "PENDING" && " - Safe To Delete"}
                        </CardTitle>
                        <CardDescription className="flex flex-col">
                            <span>
                                From {request.user_name}, requested {new Date(request.created_at).toLocaleString()}
                            </span>
                            {request.status === "ACCEPTED" && (
                                <span>This request will be automatically deleted next Monday</span>
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>{request.details}</CardContent>
                    <CardFooter className="gap-2">
                        <DeleteAuthorRequest id={request.id} />
                        {request.status !== "ACCEPTED" && request.status !== "REJECTED" && (
                            <>
                                <RejectAuthorRequest requestId={request.id} userName={request.user_name} />
                                <ApproveAuthorRequest
                                    requestId={request.id}
                                    userId={request.user_id}
                                    userName={request.user_name}
                                />
                            </>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
