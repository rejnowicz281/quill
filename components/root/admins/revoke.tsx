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

export default function RevokeAdmin({ admin }: { admin: BasicUser }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button asChild variant="destructive">
                    <SubmitButton content="Revoke Admin Privileges" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Revoke Admin Privileges</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to revoke admin privileges from user <strong>{admin.name}</strong>. This action is
                        irreversible. Are you sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={() => revokeUserPrivileges(admin.id)}>
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
