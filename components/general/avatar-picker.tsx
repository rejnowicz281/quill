"use client";

import DEFAULT_AVATAR_URL from "@/lib/constants/default-avatar-url";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function AvatarPicker() {
    const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_AVATAR_URL);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxSizeInBytes = 6 * 1024 * 1024; // 6MB

            if (file.size > maxSizeInBytes) {
                alert("Image is too large. Max image size is 6MB.");
                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {
                setSelectedImage(event.target?.result as string);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(DEFAULT_AVATAR_URL);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleImageClick = () => {
        if (selectedImage !== DEFAULT_AVATAR_URL) handleRemoveImage();
        else inputRef.current?.click();
    };

    return (
        <>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                onChange={handleImageChange}
            />
            <button
                type="button"
                onClick={handleImageClick}
                className="rounded-[50%] w-[100px] h-[100px] relative group"
            >
                <Image
                    src={selectedImage}
                    fill
                    unoptimized
                    sizes="150px"
                    alt="Your avatar"
                    className="rounded-[50%] cursor-pointer group-hover:opacity-30 transition-opacity"
                />
                {selectedImage !== DEFAULT_AVATAR_URL && (
                    <X className="text-2xl absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
            </button>
        </>
    );
}
