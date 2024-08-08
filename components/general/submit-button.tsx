"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
    className,
    content,
    loading,
    formAction,
    onClick,
    disabled
}: {
    disabled?: boolean;
    className?: string;
    content: ReactNode | string;
    loading?: ReactNode | string;
    formAction?: (formData: FormData) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            onClick={onClick}
            formAction={formAction}
            className={className}
            disabled={pending || disabled}
            type="submit"
        >
            {loading ? (pending ? loading : content) : content}
        </button>
    );
}
