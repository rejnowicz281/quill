import useBaseForm from "../../base-form";
import postGeneratorSchema from "./schema";

const usePostGeneratorForm = () => {
    const { form, onSubmitClick } = useBaseForm({
        schema: postGeneratorSchema,
        defaultValues: {
            niche: "",
            preferredLength: "200",
            writingStyle: "Formal",
            additionalInstructions: ""
        }
    });

    return { form, onSubmitClick };
};

export default usePostGeneratorForm;
