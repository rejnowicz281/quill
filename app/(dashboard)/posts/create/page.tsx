"use client";

import PageTitle from "@/components/general/page-title";
import PostForm from "@/components/posts/form";

export default function CreatePostPage() {
    return (
        <div className="flex flex-col flex-1">
            <PageTitle>Create Post</PageTitle>
            <PostForm />
        </div>
    );
}
