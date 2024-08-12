"use client";

import Image from "next/image";

export default function Avatar({
    userId,
    src,
    alt,
    avatarSize = 60,
    markerSize = 15
}: {
    userId: string;
    src: string;
    alt?: string;
    avatarSize?: number;
    markerSize?: number;
}) {
    // TODO: Implement is logged in
    const isLoggedIn = false;

    return (
        <div
            className="relative shrink-0"
            style={{
                width: avatarSize,
                height: avatarSize
            }}
        >
            <Image fill className="rounded-[50%]" src={src} alt={alt || `User ${userId}`} />
            {isLoggedIn && (
                <div
                    className="absolute bottom-0 right-0 border-[1px] border-solid border-black rounded-[50%] bg-green-400"
                    style={{ width: markerSize, height: markerSize }}
                />
            )}
        </div>
    );
}
