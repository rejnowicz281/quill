"use client";

import generateAiPost from "@/action/ai/read/generate-ai-post";
import createPost from "@/action/posts/modify/create-post";
import editPost from "@/action/posts/modify/edit-post";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Post } from "@/lib/types/post";
import usePostForm from "@/lib/utils/forms/post-form";
import { LoaderCircle, WandSparkles } from "lucide-react";
import SubmitButton from "../general/submit-button";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function PostForm({ post, afterSubmit }: { post?: Post; afterSubmit?: () => void }) {
    const { form, onSubmitClick } = usePostForm(post);

    return (
        <>
            <Form {...form}>
                <form
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
            <form
                action={() => {
                    generateAiPost(
                        "sunglasses",
                        "humorous",
                        "be funny and stuff. talk about sunglasses and you know. just be a cool guy! tell a story about sunglasses and how cool they are."
                    ).then((res) => {
                        form.setValue("content", res.post);
                    });
                }}
            >
                <Button asChild variant="outline" className="gap-2">
                    <SubmitButton
                        content={
                            <>
                                Generate Content
                                <WandSparkles size="18" />
                            </>
                        }
                        loading={
                            <>
                                Generate Content
                                <LoaderCircle className="animate-spin" size="18" />
                            </>
                        }
                    />
                </Button>
            </form>
        </>
    );
}
