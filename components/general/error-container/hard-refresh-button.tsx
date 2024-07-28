"use client";

export default function HardRefreshButton({ className = "text-blue-500 hover:underline", content = "Refresh" }) {
    return (
        <button className={className} onClick={() => window.location.reload()}>
            {content}
        </button>
    );
}
