import useBaseForm from "./base-form";
import registerSchema from "./schemas/register-schema";

const useRegisterForm = () => {
    const { form, onSubmitClick } = useBaseForm({
        schema: registerSchema,
        defaultValues: { email: "", name: "", password: "" }
    });

    return { form, onSubmitClick };
};

export default useRegisterForm;
