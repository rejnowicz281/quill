import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/general/shadcn";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

export default function PasswordControl({
    placeholder = "••••••••",
    className,
    field
}: {
    placeholder?: string;
    className?: string;
    field: ControllerRenderProps<
        {
            [x: string]: any;
        },
        "password"
    >;
}) {
    const [type, setType] = useState<"text" | "password">("password");

    return (
        <div className={cn("relative", className)}>
            <FormControl>
                <Input type={type} className="pr-9" placeholder={placeholder} {...field} />
            </FormControl>
            <button
                type="button"
                className="rounded-md absolute top-0 bottom-0 right-0 shrink px-2 text-gray-500 hover:text-gray-400 transition-colors ring-offset-white focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-within:ring-zinc-300"
                onClick={() => setType((prev) => (prev === "password" ? "text" : "password"))}
            >
                {type === "password" ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
}
