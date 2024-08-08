"use client";

import revokeAuthorPrivileges from "@/action/admin/authors/modify/revoke-privileges";
import { Author } from "@/action/admin/dashboard/dashboard-query";
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

export default function RevokeAuthor({ author }: { author: Author }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button asChild variant="destructive">
                    <SubmitButton content="Revoke Author Privileges" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Revoke Author Privileges</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to revoke author privileges from user <strong>{author.name}</strong>. This action
                        is irreversible. Are you sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={() => revokeAuthorPrivileges(author.id)}>
                        <AlertDialogAction asChild>
                            <Button asChild>
                                <SubmitButton content="Revoke" />
                            </Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
