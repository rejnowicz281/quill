import generateErrorStream from "@/lib/utils/ai/helpers/generate-error-stream";
import postGeneratorSystemPrompt from "@/lib/utils/ai/prompts/post-generator-prompt";
import { OpenAIStream } from "ai";

export async function POST(req: Request) {
    const { niche, preferredLength, additionalInstructions, writingStyle } = await req.json();

    const system = postGeneratorSystemPrompt(niche, writingStyle, additionalInstructions, preferredLength);

    const messages = [system];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        method: "POST",
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.5,
            max_tokens: 4096,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: true,
            n: 1
        })
    });

    if (!res.ok) return new Response(generateErrorStream(res.statusText));

    const stream = OpenAIStream(res);

    return new Response(stream);
}
