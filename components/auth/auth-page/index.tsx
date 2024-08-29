import Link from "next/link";
import QuillSvg from "../../icons/quill-svg";
import { Button } from "../../ui/button";
import AuthContainer from "./auth-container";

export default function AuthPage({ action = "login" }: { action: "login" | "register" }) {
    return (
        <div className="flex-1 flex flex-col sm:flex-col-reverse">
            <div className="p-4 flex-1 flex flex-col">
                <AuthContainer action={action} />
            </div>
            <div className="sm:p-4 flex justify-between items-center">
                <div className="hidden sm:flex gap-3 text-3xl items-center">
                    <QuillSvg />
                    <h1 className="tracking-widest">quill</h1>
                </div>
                <Button
                    asChild
                    variant="ghost"
                    className="text-xl border-t border-t-neutral-300 dark:border-t-neutral-800 sm:border-t-0 rounded-none sm:rounded-md flex-1 h-12 sm:h-10 sm:flex-initial"
                >
                    {action === "login" ? <Link href="/register">Register</Link> : <Link href="/login">Login</Link>}
                </Button>
            </div>
        </div>
    );
}
