import { NextResponse } from "next/server";
import { getAiProviderConfig } from "@/lib/ai-provider";
import {
  buildAssistantSystemPrompt,
  getDeterministicAssistantReply,
  getAssistantResponseMeta,
  type ChatMessage,
} from "@/lib/portfolio-assistant";

export const runtime = "nodejs";

type ChatRequestBody = {
  messages?: ChatMessage[];
};

function formatProviderFailure(status: number, provider: string) {
  if (status === 401 || status === 403) {
    return `The ${provider} request was rejected. Please check that your API key is valid and has access enabled.`;
  }

  if (status === 404) {
    return `The ${provider} endpoint or model could not be found. Please verify your AI model and provider configuration.`;
  }

  if (status === 429) {
    return `The ${provider} request hit a rate limit or billing limit. Please check usage and try again shortly.`;
  }

  return `I’m having trouble reaching the ${provider} provider right now. Please try again in a moment or contact the developer directly.`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;
  const messages = body.messages ?? [];
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const provider = getAiProviderConfig();
  const providerMessages = messages.slice(-10).map((message) => ({
    role: message.role,
    content: message.content,
  }));

  if (!latestUserMessage) {
    return NextResponse.json({ error: "No user message provided." }, { status: 400 });
  }

  const deterministicReply = getDeterministicAssistantReply(latestUserMessage.content);

  if (deterministicReply) {
    return NextResponse.json({
      message: deterministicReply.message,
      sources: [],
      suggestions: deterministicReply.suggestions,
    });
  }

  if (!provider.apiKey) {
    const meta = getAssistantResponseMeta(latestUserMessage.content);

    return NextResponse.json({
      message:
        "The AI assistant is not connected yet. Add your API key in `.env.local`, then I can answer questions and help qualify leads.",
      ...meta,
    });
  }

  let response: Response;

  try {
    response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.apiKey}`,
      },
      body: JSON.stringify({
        model: provider.model,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content: buildAssistantSystemPrompt(latestUserMessage.content),
          },
          ...providerMessages,
        ],
      }),
    });
  } catch (error) {
    const meta = getAssistantResponseMeta(latestUserMessage.content);

    console.error("AI provider network error", {
      provider: provider.provider,
      baseUrl: provider.baseUrl,
      model: provider.model,
      error,
    });

    return NextResponse.json(
      {
        message:
          "The AI provider could not be reached. Please check your internet connection, provider URL, or API configuration.",
        ...(process.env.NODE_ENV === "development"
          ? {
              debug: {
                provider: provider.provider,
                baseUrl: provider.baseUrl,
                model: provider.model,
                error: error instanceof Error ? error.message : String(error),
              },
            }
          : {}),
        ...meta,
      },
      { status: 500 },
    );
  }

  if (!response.ok) {
    const errorText = await response.text();
    const meta = getAssistantResponseMeta(latestUserMessage.content);
    const failureMessage = formatProviderFailure(response.status, provider.provider);

    console.error("AI provider request failed", {
      provider: provider.provider,
      baseUrl: provider.baseUrl,
      model: provider.model,
      status: response.status,
      errorText,
    });

    return NextResponse.json(
      {
        message: failureMessage,
        ...(process.env.NODE_ENV === "development"
          ? {
              debug: {
                provider: provider.provider,
                baseUrl: provider.baseUrl,
                model: provider.model,
                status: response.status,
                error: errorText,
              },
            }
          : {}),
        ...meta,
      },
      { status: 500 },
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const message = data.choices?.[0]?.message?.content?.trim();
  const meta = getAssistantResponseMeta(latestUserMessage.content);

  return NextResponse.json({
    message:
      message ||
      "I don’t have that detail, but I can connect you directly with the developer.",
    ...meta,
  });
}
