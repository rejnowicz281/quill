"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { PersonStanding } from "lucide-react";
import { useState } from "react";
import MainContent from "./main-content";

export default function AddContactButton() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex flex-row gap-2 items-center border rounded-2xl">
                    <PersonStanding />
                    <div>Add Contact</div>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[500px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Contact</DialogTitle>
                    <DialogDescription>Here you can search for users to chat with.</DialogDescription>
                </DialogHeader>

                <MainContent closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
