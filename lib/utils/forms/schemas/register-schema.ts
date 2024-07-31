import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export default registerSchema;
