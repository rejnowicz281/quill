import { PostGeneratorProvider } from "@/providers/post-generator-provider";
import MainContent from "./main-content";

export type OnApplyType = ({ title, content }: { title?: string; content?: string }) => void;

export type PostGeneratorProps = {
    onApply?: OnApplyType;
    revisingContent?: string;
};

export default function PostGenerator({ onApply, revisingContent }: PostGeneratorProps) {
    return (
        <PostGeneratorProvider revisingContent={revisingContent}>
            <MainContent onApply={onApply} />
        </PostGeneratorProvider>
    );
}
