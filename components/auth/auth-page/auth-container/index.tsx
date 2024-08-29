"use client";

import { useSearchParams } from "next/navigation";
import QuillSvg from "../../../icons/quill-svg";
import DemoLoginButton from "./demo-login-button";
import GithubLoginButton from "./github-login-button";
import GoogleLoginButton from "./google-login-button";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthContainer({ action = "login" }: { action: "login" | "register" }) {
    const params = useSearchParams();

    const message = params?.get("message");

    return (
        <div className="flex-1 mx-auto max-w-[400px] w-full flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-3 items-center text-center">
                <div className="flex items-center gap-3">
                    <div className="sm:hidden">
                        <QuillSvg />
                    </div>
                    <h2 className="text-3xl font-semibold">{action === "login" ? "Login" : "Register"}</h2>
                </div>
                <p className={message ? "text-red-500 font-semibold" : "text-gray-500"}>
                    {message
                        ? message
                        : `Enter your credentials below to ${action === "login" ? "log in" : "register your account"}.`}
                </p>
            </div>
            {action === "register" ? <RegisterForm /> : <LoginForm />}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-t-neutral-300 dark:border-t-neutral-600"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="dark:bg-[#121212] bg-white px-2 font-semibold tracking-widest text-gray-500">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <DemoLoginButton />
                <GithubLoginButton />
                <GoogleLoginButton />
            </div>
        </div>
    );
}
