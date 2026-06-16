import { callOpenRouterAI } from "../ai/openrouter";

export const analyzeRepo = async (repoUrl: string) => {
  const initialMessage: { role: "user"; content: string }[] = [
    {
      role: "user",
      content: `Analyze this GitHub repository: ${repoUrl}`,
    },
  ];

  // First API call
  const firstResponse = await callOpenRouterAI(initialMessage);

  // Second call messages
  const messages: { role: "user" | "assistant"; content: string }[] = [
    ...initialMessage,
    {
      role: "assistant",
      content: firstResponse.content,
    },
    {
      role: "user",
      content: "Are you sure? Think carefully.",
    },
  ];

  const secondResponse = await callOpenRouterAI(messages);

  return secondResponse;
};
