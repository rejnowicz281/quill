"use client";

import generatePostContent from "@/action/ai/read/generate-post-content";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import writingStyles from "@/lib/constants/writing-styles";
import usePostGeneratorForm from "@/lib/utils/forms/post/generator/form";
import { useState } from "react";
import { OnGenerateType } from ".";

export default function PostGeneratorForm({ onGenerate }: { onGenerate?: OnGenerateType }) {
    const { form, onSubmitClick } = usePostGeneratorForm();

    const [customWritingStyle, setCustomWritingStyle] = useState(false);

    return (
        <>
            <Form {...form}>
                <form
                    className="flex-1 flex flex-col"
                    action={async (formData: FormData) => {
                        if (onGenerate) {
                            const niche = formData.get("niche") as string;
                            const writingStyle = formData.get("writingStyle") as string;
                            const additionalInstructions = formData.get("additionalInstructions") as string;
                            const preferredLength = parseInt(formData.get("preferredLength") as string);

                            const generated = await generatePostContent(
                                niche,
                                writingStyle,
                                additionalInstructions,
                                preferredLength
                            );

                            onGenerate({ content: generated.content });
                        }
                    }}
                >
                    <FormField
                        control={form.control}
                        name="niche"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Niche</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your niche" {...field} />
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
                                    <Input placeholder="Default 200" type="number" {...field} />
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
                                <FormLabel>Writing Style</FormLabel>
                                <FormControl>
                                    {customWritingStyle ? (
                                        <Input type="string" {...field} />
                                    ) : (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Writing style" />
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
                    <Button
                        type="button"
                        onClick={() => {
                            setCustomWritingStyle(!customWritingStyle);
                        }}
                    >
                        {customWritingStyle ? "Select from predefined writing styles" : "Use custom writing style"}
                    </Button>

                    <FormField
                        control={form.control}
                        name="additionalInstructions"
                        render={({ field }) => (
                            <FormItem className="flex-1 flex flex-col">
                                <FormLabel>Additional Instructions</FormLabel>
                                <FormControl>
                                    <Textarea className="flex-1" placeholder="Additional instructions" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button asChild>
                        <SubmitButton onClick={onSubmitClick} content="Generate Content" />
                    </Button>
                </form>
            </Form>
        </>
    );
}
