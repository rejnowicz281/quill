import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
    return (
        <div className="border-b border-b-neutral-300 dark:border-b-neutral-800 pb-6 mb-8">
            <h1 className="text-3xl font-semibold">{children}</h1>
        </div>
    );
}
