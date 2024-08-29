"use client";

import register from "@/action/auth/modify/register";
import AvatarPicker from "@/components/general/avatar-picker";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useRegisterForm from "@/lib/utils/forms/auth/register/form";
import { LoaderCircle } from "lucide-react";
import PasswordInputControl from "../../password-input/control-version";

export default function RegisterForm() {
    const { form, onSubmitClick } = useRegisterForm();

    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" action={register}>
                <div className="flex justify-center">
                    <AvatarPicker />
                </div>
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                                <FormLabel className="text-right pr-3">Email</FormLabel>
                                <FormControl className="col-span-3">
                                    <Input placeholder="john@doe.com" {...field} />
                                </FormControl>
                                <FormMessage className="col-start-2 pl-3 py-1 col-span-3 font-semibold" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                                <FormLabel className="text-right pr-3">Name</FormLabel>
                                <FormControl className="col-span-3">
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage className="col-start-2 pl-3 py-1 col-span-3 font-semibold" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                                <FormLabel className="text-right pr-3">Password</FormLabel>
                                <PasswordInputControl
                                    placeholder="Must be at least 6 characters"
                                    className="col-span-3"
                                    field={field}
                                />
                                <FormMessage className="col-start-2 pl-3 py-1 col-span-3 font-semibold" />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    asChild
                    className="dark:bg-zinc-800 dark:text-white dark:border dark:border-neutral-700 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1"
                >
                    <SubmitButton
                        onClick={onSubmitClick}
                        content="Register your account"
                        loading={<LoaderCircle className="animate-spin" />}
                    />
                </Button>
            </form>
        </Form>
    );
}
