"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AuthorRequestForm from "./form";

export default function CreateAuthorRequest() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Submit New Author Request</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col max-w-screen-xl max-h-[96vh] h-full">
                <DialogTitle className="text-3xl font-bold">Submit New Author Request</DialogTitle>
                <AuthorRequestForm afterSubmit={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
