import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const openrouter = createOpenAICompatible({
  name: "openrouter",
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// POST handler function
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const { text } = await generateText({
      model: openrouter("openai/gpt-oss-20b:free"),
      prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Error generating text:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
