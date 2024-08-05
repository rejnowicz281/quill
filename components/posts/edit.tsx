"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Post } from "@/lib/types/post";
import { Edit } from "lucide-react";
import { useState } from "react";
import PostForm from "./form";

export default function EditPost({ post }: { post: Post }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Edit size={20} className="text-gray-500" />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col max-w-screen-xl max-h-[96vh] h-full">
                <DialogTitle className="text-3xl font-bold">Edit Post</DialogTitle>
                <PostForm post={post} afterSubmit={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
