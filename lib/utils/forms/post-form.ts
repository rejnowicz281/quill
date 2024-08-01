import useBaseForm from "./base-form";
import postSchema from "./schemas/post-schema";

const usePostForm = () => {
    const { form, onSubmitClick } = useBaseForm({
        schema: postSchema,
        defaultValues: { title: "", content: "" }
    });

    return { form, onSubmitClick };
};

export default usePostForm;
