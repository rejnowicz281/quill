"use client";

import approveAuthorRequest from "@/action/admin/author-requests/modify/approve";
import SubmitButton from "@/components/general/submit-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function ApproveAuthorRequest({
    requestId,
    userId,
    userName
}: {
    requestId: string;
    userId: string;
    userName: string;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button asChild>
                    <SubmitButton content="Approve" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Approve Author Request</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to make user <strong>{userName}</strong> an author, allowing them to publish their
                        own posts. Are you sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={() => approveAuthorRequest(requestId, userId)}>
                        <AlertDialogAction asChild>
                            <Button asChild>
                                <SubmitButton content="Approve" />
                            </Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
