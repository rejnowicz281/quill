"use client";

import createMessage from "@/action/chat/modify/create";
import getMinimalPost from "@/action/posts/read/get-minimal-post/server";
import { Input } from "@/components/ui/input";
import { MinimalPost } from "@/lib/types/post";
import useStompContext from "@/providers/stomp-provider";
import { useQuery } from "@tanstack/react-query";
import { CornerUpLeft, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "../general/submit-button";
import { Button } from "../ui/button";
import ReferPost from "./refer-post";

export default function CreateMessage({
    receiverId,
    referencedPostId
}: {
    receiverId: string;
    referencedPostId?: string;
}) {
    const formRef = useRef<HTMLFormElement>(null);

    const { sendRefreshTo } = useStompContext();

    const [referencedPost, setReferencedPost] = useState<MinimalPost | undefined>();

    const handleSend = async (formData: FormData) => {
        formRef.current?.reset();

        await createMessage(formData, receiverId, referencedPost?.id);
        setReferencedPost(undefined);
        sendRefreshTo(receiverId);
    };

    const { data, isFetched } = useQuery({
        queryKey: ["referencedPost", referencedPostId],
        queryFn: async () => {
            const res = await getMinimalPost(referencedPostId!);

            return res ? res : null;
        }
    });

    useEffect(() => {
        if (isFetched && data) setReferencedPost(data);
    }, [isFetched]);

    return (
        <div className="flex flex-col">
            {referencedPost && (
                <div className="flex justify-end items-center p-2 gap-3">
                    <Link
                        href={`/posts/${referencedPost.id}`}
                        className="hover:underline flex gap-2 text-sm text-zinc-300"
                    >
                        <CornerUpLeft size="14" />
                        {referencedPost.title}
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setReferencedPost(undefined);
                        }}
                    >
                        <Trash size={20} className="text-gray-500" />
                    </Button>
                </div>
            )}
            <form className="flex items-center justify-center" ref={formRef} action={handleSend}>
                <Input
                    className="text-md py-5 h-min rounded-none dark:bg-inherit border-none focus-visible:ring-0"
                    placeholder="Type your message here..."
                    type="content"
                    name="content"
                />
                <ReferPost userId={receiverId} afterChoice={setReferencedPost} />
                <SubmitButton
                    className="text-md flex group justify-center p-3 items-center disabled:pointer-events-none disabled:opacity-50"
                    onClick={(e) => {
                        const formData = new FormData(formRef.current!);
                        const contentFormData = formData.get("content");
                        const content = typeof contentFormData === "string" ? contentFormData.trim() : null;
                        if (!content) e.preventDefault();
                    }}
                    content={
                        <div className="p-2 text-blue-500 rounded-md transition-colors group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 font-bold">
                            SEND
                        </div>
                    }
                />
            </form>
        </div>
    );
}
