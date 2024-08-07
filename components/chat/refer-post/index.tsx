"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MinimalPost } from "@/lib/types/post";
import { SquareArrowUpLeft } from "lucide-react";
import { useState } from "react";
import PostReferralList from "./list";

export default function ReferPost({
    userId,
    afterChoice
}: {
    userId: string;
    afterChoice: (referredPost: MinimalPost) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <SquareArrowUpLeft size={20} className="text-gray-500" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Refer Post</DialogTitle>
                <DialogDescription>Click on a post to refer it to the user</DialogDescription>
                <PostReferralList
                    userId={userId}
                    afterChoice={(referredPost: MinimalPost) => {
                        setOpen(false);
                        afterChoice(referredPost);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
