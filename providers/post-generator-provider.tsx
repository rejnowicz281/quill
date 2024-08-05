"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const PostGeneratorContext = createContext<{
    generated: string;
    setGenerated: React.Dispatch<React.SetStateAction<string>>;
    isGenerating: boolean;
    setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function PostGeneratorProvider({ children }: { children: ReactNode }) {
    const [generated, setGenerated] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    return (
        <PostGeneratorContext.Provider
            value={{
                generated,
                setGenerated,
                isGenerating,
                setIsGenerating
            }}
        >
            {children}
        </PostGeneratorContext.Provider>
    );
}

export default function usePostGeneratorContext() {
    const context = useContext(PostGeneratorContext);

    if (!context) throw new Error("usePostGeneratorContext must be used within a PostGeneratorContext Provider");

    return context;
}
