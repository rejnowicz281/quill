"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AuthorRequest } from "@/lib/types/author-request";
import { useState } from "react";
import AuthorRequestForm from "./form";

export default function EditAuthorRequest({ request }: { request: AuthorRequest }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Edit</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col max-w-screen-xl max-h-[96vh] h-full">
                <DialogTitle className="text-3xl font-bold">Edit Author Request</DialogTitle>
                <AuthorRequestForm request={request} afterSubmit={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
