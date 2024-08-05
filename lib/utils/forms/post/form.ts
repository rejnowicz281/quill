import { Post } from "@/lib/types/post";
import useBaseForm from "../base-form";
import postSchema from "./schema";

const usePostForm = (post?: Post) => {
    const { form, onSubmitClick } = useBaseForm({
        schema: postSchema,
        defaultValues: { title: post?.title ?? "", content: post?.content ?? "" }
    });

    return { form, onSubmitClick };
};

export default usePostForm;
