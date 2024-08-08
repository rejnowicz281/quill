"use server";

import actionError from "@/lib/utils/actions/action-error";
import actionSuccess from "@/lib/utils/actions/action-success";
import postTitleGeneratorSystem from "@/lib/utils/ai/prompts/post-title-generator-prompt";
import { randomUUID } from "crypto";

const promptTesting = async () => {
    const actionName = "promptTesting";

    await new Promise((resolve) => setTimeout(resolve, 100));

    const test = () => randomUUID();

    return actionSuccess(actionName, { title: test }, { logData: false });
};

export default async function generatePostTitle(postContent: string) {
    // return await promptTesting();

    const actionName = `generatePostTitle`;

    const messages = [postTitleGeneratorSystem(postContent)];

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

    const title = data.choices[0].message.content;

    return actionSuccess(actionName, { title }, { logData: false });
}
