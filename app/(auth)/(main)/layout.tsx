import GithubLoginButton from "@/components/auth/github-login-button";
import GoogleLoginButton from "@/components/auth/google-login-button";
import { ReactNode } from "react";

export default function MainAuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <GithubLoginButton />
            <GoogleLoginButton />
        </>
    );
}
