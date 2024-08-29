import login from "@/action/auth/modify/login";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import PasswordInput from "../../password-input";

export default function LoginForm() {
    return (
        <form className="flex flex-col gap-6" action={login}>
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 items-center">
                    <Label className="text-right pr-3" htmlFor="email">
                        Email
                    </Label>
                    <Input className="col-span-3" type="email" name="email" id="email" placeholder="name@example.com" />
                </div>
                <div className="grid grid-cols-4 items-center">
                    <Label className="text-right pr-3" htmlFor="password">
                        Password
                    </Label>
                    <PasswordInput className="col-span-3" />
                </div>
            </div>
            <Button
                asChild
                className="dark:bg-zinc-800 dark:text-white dark:border dark:border-neutral-700 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1"
            >
                <SubmitButton content="Login with Email" loading={<LoaderCircle className="animate-spin" />} />
            </Button>
        </form>
    );
}
