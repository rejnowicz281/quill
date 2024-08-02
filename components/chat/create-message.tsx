"use client";

import createMessage from "@/action/chat/modify/create-message";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import SubmitButton from "../general/submit-button";

export default function CreateMessage({ receiverId }: { receiverId: string }) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSend = async (formData: FormData) => {
        formRef.current?.reset();

        createMessage(formData, receiverId);
    };

    return (
        <form className="flex items-center justify-center" ref={formRef} action={handleSend}>
            <Input
                className="text-md py-5 h-min rounded-none dark:bg-inherit border-none"
                placeholder="Type your message here..."
                type="content"
                name="content"
            />
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
    );
}
