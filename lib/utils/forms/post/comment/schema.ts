import { z } from "zod";

const commentSchema = z.object({
    content: z.string().trim().min(1, "Please write something")
});

export default commentSchema;
