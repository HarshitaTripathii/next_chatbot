import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const openrouter = createOpenAICompatible({
  name: "openrouter",
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
export async function POST() {
  const { text } = await generateText({
    model: openrouter("openai/gpt-oss-20b:free"),
    prompt: "full form of FTP",
  });

  return Response.json({ text });
}
