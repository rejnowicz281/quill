"use client";

import generatePostTitle from "@/action/ai/read/generate-post-title";
import createPost from "@/action/posts/modify/create";
import editPost from "@/action/posts/modify/edit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Post } from "@/lib/types/post";
import usePostForm from "@/lib/utils/forms/post/form";
import { cn } from "@/lib/utils/general/shadcn";
import { LoaderCircle, WandSparkles } from "lucide-react";
import SubmitButton from "../general/submit-button";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import PostContentGenerator from "./generate-content";

export default function PostForm({ post, afterSubmit }: { post?: Post; afterSubmit?: () => void }) {
    const { form, onSubmitClick } = usePostForm(post);

    const content = form.watch("content");

    return (
        <Form {...form}>
            <form
                className="flex-1 flex flex-col gap-4"
                action={(formData: FormData) => {
                    if (post) editPost(formData, post.id);
                    else createPost(formData);

                    if (afterSubmit) afterSubmit();
                }}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2 items-center">
                                Title
                                <SubmitButton
                                    disabled={!content}
                                    formAction={async () => {
                                        const { title } = await generatePostTitle(content);
                                        form.setValue("title", title);
                                    }}
                                    content={
                                        <WandSparkles
                                            size="16"
                                            className={cn(!content ? "text-gray-500" : "text-zinc-200")}
                                        />
                                    }
                                    loading={<LoaderCircle size="16" className="text-zinc-200 animate-spin" />}
                                />
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="A captivating title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea className="flex-1 resize-none" placeholder="Your thoughts..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <PostContentGenerator
                    revisingContent={content}
                    onApply={({ title, content }) => {
                        if (title) form.setValue("title", title);
                        if (content) form.setValue("content", content);
                    }}
                />
                <Button asChild>
                    <SubmitButton
                        onClick={onSubmitClick}
                        content="Submit"
                        loading={<LoaderCircle className="animate-spin" />}
                    />
                </Button>
            </form>
        </Form>
    );
}
