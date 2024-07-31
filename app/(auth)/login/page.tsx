import login from "@/action/auth/modify/login";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <>
            <form action={login}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="john@doe.com" name="email" id="email" />
                <Label htmlFor="password">Password</Label>
                <Input placeholder="••••••••" type="password" name="password" id="password" />
                <Button asChild>
                    <SubmitButton content="Sign In" loading={<LoaderCircle className="animate-spin" />} />
                </Button>
            </form>
            <Link href="/register">Don't have an account? Register here</Link>
        </>
    );
}
