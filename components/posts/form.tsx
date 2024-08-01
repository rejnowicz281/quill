"use client";

import createPost from "@/action/posts/modify/create-post";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePostForm from "@/lib/utils/forms/post-form";
import { LoaderCircle } from "lucide-react";
import SubmitButton from "../general/submit-button";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function PostForm({ id }: { id?: string }) {
    const { form, onSubmitClick } = usePostForm();

    return (
        <Form {...form}>
            <form action={createPost}>
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
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your thoughts..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button asChild>
                    <SubmitButton
                        onClick={onSubmitClick}
                        content="Create Post"
                        loading={<LoaderCircle className="animate-spin" />}
                    />
                </Button>
            </form>
        </Form>
    );
}
