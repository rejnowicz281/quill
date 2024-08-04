"use client";

import deleteAuthorRequest from "@/action/author-requests/modify/delete-author-request";
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
import { Trash } from "lucide-react";

export default function DeleteAuthorRequest({ id }: { id: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Trash size={20} className="text-gray-500" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Author Request</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to delete the
                        <strong className="block">{id}</strong>
                        author request. Are you sure?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={() => deleteAuthorRequest(id)}>
                        <AlertDialogAction asChild>
                            <Button asChild>
                                <SubmitButton content="Delete" />
                            </Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
