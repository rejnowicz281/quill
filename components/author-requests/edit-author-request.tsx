"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AuthorRequest } from "@/lib/types/author-request";
import { Edit } from "lucide-react";
import { useState } from "react";
import AuthorRequestForm from "./form";

export default function EditAuthorRequest({ request }: { request: AuthorRequest }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Edit size={20} className="text-gray-500" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-3xl font-bold">Edit Author Request</DialogTitle>
                <AuthorRequestForm request={request} afterSubmit={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
