import { z } from "zod";

const postGeneratorSchema = z.object({
    niche: z.string(),
    preferredLength: z.coerce.number(),
    writingStyle: z.string(),
    additionalInstructions: z.string()
});

export default postGeneratorSchema;
