"use client";

import editAuthorRequest from "@/action/author-requests/modify/edit";
import submitAuthorRequest from "@/action/author-requests/modify/submit";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AuthorRequest } from "@/lib/types/author-request";
import useAuthorRequestForm from "@/lib/utils/forms/author-request/form";
import { LoaderCircle } from "lucide-react";

export default function AuthorRequestForm({
    request,
    afterSubmit
}: {
    request?: AuthorRequest;
    afterSubmit?: () => void;
}) {
    const { form, onSubmitClick } = useAuthorRequestForm(request);

    return (
        <Form {...form}>
            <form
                className="flex flex-1 flex-col gap-4"
                action={(formData: FormData) => {
                    if (request) editAuthorRequest(formData);
                    else submitAuthorRequest(formData);

                    if (afterSubmit) afterSubmit();
                }}
            >
                <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Details</FormLabel>
                            <FormDescription>
                                Please fill out the form below. Tell us a little bit about yourself and why you would
                                like to become an author.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    className="resize-none flex-1"
                                    placeholder="Your reasoning here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button asChild>
                    <SubmitButton
                        onClick={onSubmitClick}
                        content={request ? "Update your request" : "Submit your request"}
                        loading={<LoaderCircle className="animate-spin" />}
                    />
                </Button>
            </form>
        </Form>
    );
}
