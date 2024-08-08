import { PostContentGeneratorProvider } from "@/providers/post-content-generator-provider";
import Main from "./main";

export type OnApplyType = ({ title, content }: { title?: string; content?: string }) => void;

export type PostContentGeneratorProps = {
    onApply?: OnApplyType;
    revisingContent?: string;
};

export default function PostContentGenerator({ onApply, revisingContent }: PostContentGeneratorProps) {
    return (
        <PostContentGeneratorProvider revisingContent={revisingContent}>
            <Main onApply={onApply} />
        </PostContentGeneratorProvider>
    );
}
