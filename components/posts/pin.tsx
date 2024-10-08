"use client";

import togglePin from "@/action/posts/modify/toggle-pin";
import { BasicPost, Post } from "@/lib/types/post";
import { Pin, PinOff } from "lucide-react";
import SubmitButton from "../general/submit-button";
import { Button } from "../ui/button";

export default function PinPost({ post }: { post: Post | BasicPost }) {
    return (
        <form action={() => togglePin(post.id)}>
            <Button size="icon" variant="ghost" asChild>
                <SubmitButton
                    content={post.pinned ? <PinOff className="text-gray-500" /> : <Pin className="text-gray-500" />}
                />
            </Button>
        </form>
    );
}
