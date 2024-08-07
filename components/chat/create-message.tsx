"use client";

import createMessage from "@/action/chat/modify/create";
import getMinimalPost from "@/action/posts/read/get-minimal-post/server";
import { Input } from "@/components/ui/input";
import { MinimalPost } from "@/lib/types/post";
import useRefreshBroadcastContext from "@/providers/refresh-broadcast-provider";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";
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

    const { sendRefreshTo } = useRefreshBroadcastContext();

    const [referencedPost, setReferencedPost] = useState<MinimalPost | undefined>();

    const handleSend = async (formData: FormData) => {
        formRef.current?.reset();

        await createMessage(formData, receiverId, referencedPost?.id);
        setReferencedPost(undefined);
        sendRefreshTo(receiverId);
    };

    const {} = useQuery({
        queryKey: ["referencedPost", { referencedPostId }],
        queryFn: async () => {
            const res = await getMinimalPost(referencedPostId!);
            setReferencedPost(res);
        },
        refetchOnMount: true,
        enabled: !!referencedPostId
    });

    return (
        <div className="flex flex-col border-t border-t-zinc-200 dark:border-t-zinc-800">
            {referencedPost && (
                <div className="flex justify-end items-center p-2 rounded-md">
                    Reference: {referencedPost.title}
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
