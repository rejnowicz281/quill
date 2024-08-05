import { PostGeneratorProvider } from "@/providers/post-generator-provider";
import MainContent from "./main-content";

export type OnApplyType = ({ title, content }: { title?: string; content?: string }) => void;

export default function PostGenerator({ onApply }: { onApply?: OnApplyType }) {
    return (
        <PostGeneratorProvider>
            <MainContent onApply={onApply} />
        </PostGeneratorProvider>
    );
}
