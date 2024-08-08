"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import writingStyles from "@/lib/constants/writing-styles";
import usePostGeneratorForm from "@/lib/utils/forms/post/generator/form";
import usePostGeneratorContext from "@/providers/post-generator-provider";
import { useMutation } from "@tanstack/react-query";
import { List, Pencil } from "lucide-react";
import { useState } from "react";

export default function PostGeneratorForm() {
    const { form } = usePostGeneratorForm();

    const [customWritingStyle, setCustomWritingStyle] = useState(false);
    const { setGenerated, isGenerating, setIsGenerating, revisingContent, isRevising } = usePostGeneratorContext();

    const { mutate: generateContent, isPending } = useMutation({
        mutationKey: ["generateContent"],

        mutationFn: async () => {
            setGenerated("");

            const response = await fetch("/api/generate-post-content", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    niche: form.getValues("niche"),
                    preferredLength: form.getValues("preferredLength"),
                    additionalInstructions: form.getValues("additionalInstructions"),
                    writingStyle: form.getValues("writingStyle"),
                    revisingContent: isRevising ? revisingContent : null
                })
            });

            return response.body;
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error("No stream");

            setIsGenerating(true);

            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);

                setGenerated((prev) => prev + chunkValue);
            }
        },
        onError: (e) => {
            console.error(e, "There was an error generating the AI content");
        },
        onSettled: () => {
            setIsGenerating(false);
        }
    });

    return (
        <>
            <Form {...form}>
                <form
                    className="flex-1 flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        generateContent();
                    }}
                >
                    <FormField
                        control={form.control}
                        name="niche"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Niche</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type your niche here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="preferredLength"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferred Length</FormLabel>
                                <FormControl>
                                    <Input placeholder="Default: 200" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="writingStyle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex gap-2 items-center">
                                    Writing Style
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCustomWritingStyle(!customWritingStyle);
                                        }}
                                    >
                                        {customWritingStyle ? (
                                            <List size="16" className="text-zinc-200" />
                                        ) : (
                                            <Pencil size="16" className="text-zinc-200" />
                                        )}
                                    </button>
                                </FormLabel>
                                <FormControl>
                                    {customWritingStyle ? (
                                        <Input placeholder="Default: Formal" type="string" {...field} />
                                    ) : (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a writing style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {writingStyles.map((style) => (
                                                    <SelectItem key={style} value={style}>
                                                        {style}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="additionalInstructions"
                        render={({ field }) => (
                            <FormItem className="flex-1 flex flex-col">
                                <FormLabel>Additional Instructions</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="flex-1 resize-none"
                                        placeholder="Additional instructions"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={isPending || isGenerating}>Generate Content</Button>
                </form>
            </Form>
        </>
    );
}
