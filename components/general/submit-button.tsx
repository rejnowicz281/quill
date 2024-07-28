"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
    className,
    content,
    loading,
    formAction,
    onClick
}: {
    className?: string;
    content: ReactNode | string;
    loading?: ReactNode | string;
    formAction?: (formData: FormData) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
    const { pending } = useFormStatus();

    // if loading is a string, it will be used as the loading text, otherwise 'content' will always be used
    return (
        <button onClick={onClick} formAction={formAction} className={className} disabled={pending} type="submit">
            {loading ? (pending ? loading : content) : content}
        </button>
    );
}
