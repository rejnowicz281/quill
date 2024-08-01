"use server";

import { PostWritingStyle } from "@/lib/types/post-writing-style";
import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import postGeneratorSystemPrompt from "@/lib/utils/ai/prompts/post-generator-prompt";
import { randomUUID } from "crypto";

const promptTesting = async () => {
    const actionName = "promptTesting";
    await new Promise((resolve) => setTimeout(resolve, 100));
    const test = () => randomUUID();

    return actionSuccess(actionName, { post: test }, { logData: false });
};

export default async function generateAiPost(
    niche: string,
    writingStyle: PostWritingStyle,
    additionalInstructions: string,
    preferredLength = 200
) {
    // return await promptTesting();

    const actionName = `generateAiPost`;

    const messages = [postGeneratorSystemPrompt(niche, writingStyle, additionalInstructions, preferredLength)];

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
            presence_penalty: 0.6,
            n: 1
        })
    });

    if (!res.ok) return actionError(actionName, { post: res.statusText });

    const data = await res.json();

    if (data.error) return actionError(actionName, { post: data.error.message });

    const post = data.choices[0].message.content;

    return actionSuccess(actionName, { post }, { logData: false });
}
