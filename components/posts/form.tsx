"use client";

import createPost from "@/action/posts/modify/create";
import editPost from "@/action/posts/modify/edit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Post } from "@/lib/types/post";
import usePostForm from "@/lib/utils/forms/post/form";
import { LoaderCircle } from "lucide-react";
import SubmitButton from "../general/submit-button";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import PostGenerator from "./generate";

export default function PostForm({ post, afterSubmit }: { post?: Post; afterSubmit?: () => void }) {
    const { form, onSubmitClick } = usePostForm(post);

    return (
        <>
            <Form {...form}>
                <form
                    className="flex-1 flex flex-col"
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
                                <FormLabel>Title</FormLabel>
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
                                    <Textarea className="flex-1" placeholder="Your thoughts..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
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
            <PostGenerator
                onGenerate={({ title, content }: { title?: string; content?: string }) => {
                    if (title) form.setValue("title", title);
                    if (content) form.setValue("content", content);
                }}
            />
        </>
    );
}
