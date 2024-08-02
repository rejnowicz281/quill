import useBaseForm from "./base-form";
import commentSchema from "./schemas/comment-schema";

const useCommentForm = () => {
    const { form, onSubmitClick } = useBaseForm({
        schema: commentSchema,
        defaultValues: { content: "" }
    });

    return { form, onSubmitClick };
};

export default useCommentForm;
