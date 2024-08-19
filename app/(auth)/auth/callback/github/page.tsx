"use client";

import githubRegister from "@/action/auth/modify/github-auth";
import Loading from "@/components/general/loading";
import { useEffect, useState } from "react";

export default function GithubCallbackPage({
    searchParams
}: {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}) {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams?.code as string;

        const handleRegister = async () => {
            if (!code) {
                setMessage("Error: No code provided");
                return;
            }

            const res = await githubRegister(code);

            if (res?.message) setMessage(res.message);
        };

        handleRegister();
    }, []);

    return (
        <div className="flex flex-col flex-1">
            {message && (
                <div className="absolute top-4 right-0 left-0 text-center text-zinc-500 text-sm">{message}</div>
            )}
            <Loading />
        </div>
    );
}
