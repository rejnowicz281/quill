import { Comment } from "@/lib/types/post/comment";
import useBaseForm from "../../base-form";
import commentSchema from "./schema";

const useCommentForm = (comment?: Comment) => {
    const { form, onSubmitClick } = useBaseForm({
        schema: commentSchema,
        defaultValues: { content: comment?.content ?? "" }
    });

    return { form, onSubmitClick };
};

export default useCommentForm;
