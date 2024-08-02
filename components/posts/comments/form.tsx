"use client";

import createComment from "@/action/posts/comments/modify/create-comment";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useCommentForm from "@/lib/utils/forms/comment-form";
import { LoaderCircle } from "lucide-react";

export default function CommentForm({ id, postId }: { id?: string; postId?: string }) {
    const { form, onSubmitClick } = useCommentForm();

    return (
        <Form {...form}>
            <form action={(formData: FormData) => createComment(formData, postId)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your comment..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button asChild>
                    <SubmitButton
                        onClick={onSubmitClick}
                        content="Comment"
                        loading={<LoaderCircle className="animate-spin" />}
                    />
                </Button>
            </form>
        </Form>
    );
}
