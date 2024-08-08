"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const PostContentGeneratorContext = createContext<{
    generated: string;
    setGenerated: React.Dispatch<React.SetStateAction<string>>;
    isGenerating: boolean;
    setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
    isRevising: boolean;
    setIsRevising: React.Dispatch<React.SetStateAction<boolean>>;
    revisingContent?: string;
} | null>(null);

export function PostContentGeneratorProvider({
    children,
    revisingContent
}: {
    children: ReactNode;
    revisingContent?: string;
}) {
    const [generated, setGenerated] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRevising, setIsRevising] = useState(!!revisingContent);

    return (
        <PostContentGeneratorContext.Provider
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
        </PostContentGeneratorContext.Provider>
    );
}

export default function usePostContentGeneratorContext() {
    const context = useContext(PostContentGeneratorContext);

    if (!context)
        throw new Error("usePostContentGeneratorContext must be used within a PostContentGeneratorContext Provider");

    return context;
}
