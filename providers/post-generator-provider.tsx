"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const PostGeneratorContext = createContext<{
    generated: string;
    setGenerated: React.Dispatch<React.SetStateAction<string>>;
    isGenerating: boolean;
    setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
    isRevising: boolean;
    setIsRevising: React.Dispatch<React.SetStateAction<boolean>>;
    revisingContent?: string;
} | null>(null);

export function PostGeneratorProvider({
    children,
    revisingContent
}: {
    children: ReactNode;
    revisingContent?: string;
}) {
    const [generated, setGenerated] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRevising, setIsRevising] = useState(false);

    return (
        <PostGeneratorContext.Provider
            value={{
                generated,
                setGenerated,
                isGenerating,
                setIsGenerating,
                isRevising,
                setIsRevising,
                revisingContent
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
