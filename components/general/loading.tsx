import { LoaderCircle } from "lucide-react";

export default function Loading({ spinnerSize = 50 }) {
    return (
        <div className="flex-1 flex justify-center items-center">
            <LoaderCircle size={spinnerSize} className="animate-spin" />
        </div>
    );
}
