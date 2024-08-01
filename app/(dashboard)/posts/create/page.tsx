import PostForm from "@/components/posts/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreatePostPage() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Button asChild>
                <Link href="/">Home</Link>
            </Button>
            <PostForm />
        </div>
    );
}
