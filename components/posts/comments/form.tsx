"use client";

import createComment from "@/action/posts/comments/modify/create";
import editComment from "@/action/posts/comments/modify/edit";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/types/post/comment";
import useCommentForm from "@/lib/utils/forms/comment-form";
import { LoaderCircle } from "lucide-react";

export default function CommentForm({
    comment,
    postId,
    afterSubmit
}: {
    comment?: Comment;
    postId: string;
    afterSubmit?: () => void;
}) {
    const { form, onSubmitClick } = useCommentForm(comment);

    return (
        <Form {...form}>
            <form
                action={(formData: FormData) => {
                    if (comment) editComment(formData, comment.id, postId);
                    else createComment(formData, postId);

                    if (afterSubmit) afterSubmit();
                }}
            >
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
                        content="Submit"
                        loading={<LoaderCircle className="animate-spin" />}
                    />
                </Button>
            </form>
        </Form>
    );
}
