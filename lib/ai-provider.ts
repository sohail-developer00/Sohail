const providerPresets = {
  openai: {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
  },
  groq: {
    baseUrl: "https://api.groq.com/openai/v1",
    model: "llama-3.3-70b-versatile",
  },
} as const;

export function getAiProviderConfig() {
  const provider = process.env.AI_PROVIDER === "groq" ? "groq" : "openai";
  const preset = providerPresets[provider];
  const apiKey = process.env.AI_API_KEY?.trim() ?? "";
  const baseUrl = process.env.AI_API_BASE_URL?.trim() || preset.baseUrl;
  const model = process.env.AI_MODEL?.trim() || preset.model;

  return {
    provider,
    apiKey,
    baseUrl,
    model,
  };
}
