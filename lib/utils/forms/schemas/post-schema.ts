import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(1, "Please write a title"),
    content: z.string().min(1, "Please write something")
});

export default postSchema;
