"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import PostGeneratorForm from "./form";

export type OnGenerateType = ({ title, content }: { title?: string; content?: string }) => void;

export default function PostGenerator({ onGenerate }: { onGenerate?: OnGenerateType }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    AI Generator
                    <WandSparkles size="18" />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col max-w-screen-xl max-h-[96vh] h-full">
                <DialogTitle className="text-3xl font-bold">AI Generator</DialogTitle>
                <PostGeneratorForm
                    onGenerate={({ title, content }) => {
                        setOpen(false);
                        if (onGenerate) onGenerate({ title, content });
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
