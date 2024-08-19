"use client";

import Loading from "@/components/general/loading";
import { ActionResponse } from "@/lib/types/action-response";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallback({ action }: { action: (code: string) => Promise<ActionResponse> }) {
    const params = useSearchParams();
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const code = params.get("code");

        const handleAction = async () => {
            if (!code) {
                setMessage("Error: No code provided");
                return;
            }

            const res = await action(code);

            if (res?.message) setMessage(res.message);
        };

        handleAction();
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
