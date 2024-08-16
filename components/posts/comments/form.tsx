"use client";

import createComment from "@/action/posts/comments/modify/create";
import editComment from "@/action/posts/comments/modify/edit";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/types/post/comment";
import useCommentForm from "@/lib/utils/forms/post/comment/form";
import { cn } from "@/lib/utils/general/shadcn";
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
                className="flex-1 flex flex-col gap-4"
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
                        <FormItem className={cn(comment && "flex-1 flex flex-col")}>
                            <FormControl>
                                <Textarea
                                    className={cn(comment && "resize-none flex-1")}
                                    placeholder="Your comment..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="secondary" asChild>
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
