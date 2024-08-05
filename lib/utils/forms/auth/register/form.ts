import useBaseForm from "../../base-form";
import registerSchema from "./schema";

const useRegisterForm = () => {
    const { form, onSubmitClick } = useBaseForm({
        schema: registerSchema,
        defaultValues: { email: "", name: "", password: "" }
    });

    return { form, onSubmitClick };
};

export default useRegisterForm;
