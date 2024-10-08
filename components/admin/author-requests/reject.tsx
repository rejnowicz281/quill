"use client";

import rejectAuthorRequest from "@/action/admin/author-requests/modify/reject";
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

export default function RejectAuthorRequest({
    requestId,
    userName,
    userId
}: {
    requestId: string;
    userName: string;
    userId: string;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button asChild variant="secondary">
                    <SubmitButton content="Reject" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Reject Author Request</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to reject the author request from user <strong>{userName}</strong>. This action is
                        irreversible. Are you sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={() => rejectAuthorRequest(requestId, userId)}>
                        <AlertDialogAction asChild>
                            <Button asChild>
                                <SubmitButton content="Reject" />
                            </Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
