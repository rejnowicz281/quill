import { AuthorRequest } from "@/lib/types/author-request";
import useBaseForm from "./base-form";
import authorRequestSchema from "./schemas/author-request-schema";

const useAuthorRequestForm = (authorRequest?: AuthorRequest) => {
    const { form, onSubmitClick } = useBaseForm({
        schema: authorRequestSchema,
        defaultValues: { details: authorRequest?.details ?? "" }
    });

    return { form, onSubmitClick };
};

export default useAuthorRequestForm;
