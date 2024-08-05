"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Comment } from "@/lib/types/post/comment";
import { Edit } from "lucide-react";
import { useState } from "react";
import CommentForm from "./form";

export default function EditComment({ comment }: { comment: Comment }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Edit size={20} className="text-gray-500" />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col max-w-screen-xl max-h-[96vh] h-full">
                <DialogTitle className="text-3xl font-bold">Edit Comment</DialogTitle>
                <CommentForm comment={comment} postId={comment.post_id} afterSubmit={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
