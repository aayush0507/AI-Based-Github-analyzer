import fetch from "node-fetch"; // or native fetch
import dotenv from "dotenv";
dotenv.config();

interface OpenRouterChoice {
  message: {
    role: string;
    content: string;
  };
}

interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenRouterChoice[];
}

export async function callOpenRouterAI(messages: { role: string; content: string }[]) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key missing in backend .env");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-oss-20b",
      messages
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("OpenRouter API error:", text);
    throw new Error("Failed to get AI response");
  }

  // ✅ Cast JSON to OpenRouterResponse
  const data = (await response.json()) as OpenRouterResponse;

  // Optional: check if choices exist
  if (!data.choices || data.choices.length === 0) {
    throw new Error("No AI choices returned");
  }

  return {
    text: data.choices[0].message.content || "No feedback generated"
  };
}
