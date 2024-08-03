import { z } from "zod";

const authorRequestSchema = z.object({
    details: z.string().trim().min(1, "Please fill out the form. We would like to know more about you.")
});

export default authorRequestSchema;
