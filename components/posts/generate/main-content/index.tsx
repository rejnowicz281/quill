"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import usePostGeneratorContext from "@/providers/post-generator-provider";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { OnApplyType } from "..";
import PostGeneratorForm from "./form";

export default function MainContent({ onApply }: { onApply?: OnApplyType }) {
    const [open, setOpen] = useState(false);
    const { generated, setGenerated, isGenerating } = usePostGeneratorContext();

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
                <div className="flex flex-1 gap-6">
                    <PostGeneratorForm />

                    <div className="flex flex-col flex-1">
                        <div className="relative flex-1">
                            <pre
                                className="absolute inset-0 flex
                                flex-col
                                text-zinc-200
                                p-4
                                rounded-lg
                                overflow-y-auto
                                whitespace-pre-wrap
                                border
                                shadow-sm"
                            >
                                {generated || <span className="text-zinc-500">Generated content will appear here</span>}
                            </pre>
                        </div>
                        <Button
                            variant="secondary"
                            disabled={isGenerating || !generated}
                            onClick={() => {
                                setOpen(false);
                                if (onApply) onApply({ content: generated });
                                setGenerated("");
                            }}
                        >
                            Apply content
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
