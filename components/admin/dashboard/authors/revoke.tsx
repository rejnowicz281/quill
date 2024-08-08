"use client";

import revokeUserPrivileges from "@/action/admin/users/revoke-privileges";
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
import { BasicUser } from "@/lib/types/user";

export default function RevokeAuthor({ author }: { author: BasicUser }) {
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
                    <form action={() => revokeUserPrivileges(author.id)}>
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
