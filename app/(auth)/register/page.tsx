"use client";

import register from "@/action/auth/modify/register";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useRegisterForm from "@/lib/utils/forms/register-form";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const { form, onSubmitClick } = useRegisterForm();

    return (
        <>
            <Form {...form}>
                <form action={register}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@doe.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Must be at least 6 characters" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button asChild>
                        <SubmitButton
                            onClick={onSubmitClick}
                            content="Sign Up with Email"
                            loading={<LoaderCircle className="animate-spin" />}
                        />
                    </Button>
                </form>
            </Form>
            <Link href="/login">Already have an account? Login</Link>
        </>
    );
}
