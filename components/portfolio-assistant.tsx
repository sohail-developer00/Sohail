"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  assistantQuickReplies,
  type AssistantSourceCard,
  type ChatMessage,
} from "@/lib/portfolio-assistant";

type UiMessage = ChatMessage & {
  id: string;
  createdAt: string;
  sources?: AssistantSourceCard[];
  suggestions?: string[];
};

const introMessage =
  "Hi, I'm Sohail's AI assistant. I can help you explore services, projects, tech stack, pricing direction, and the best way to approach your idea. What are you planning to build?";

const initialMessages: UiMessage[] = [
  {
    id: "assistant-intro",
    role: "assistant",
    content: introMessage,
    createdAt: new Date().toISOString(),
    suggestions: assistantQuickReplies,
  },
];

const bubbleSize = {
  mobile: 58,
  desktop: 64,
};

function createMessageId() {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis) {
    const cryptoObject = globalThis.crypto;

    if (typeof cryptoObject?.randomUUID === "function") {
      return cryptoObject.randomUUID();
    }
  }

  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getBubbleSize() {
  if (typeof window === "undefined") {
    return bubbleSize.desktop;
  }

  return window.innerWidth < 640 ? bubbleSize.mobile : bubbleSize.desktop;
}

function clampBubblePosition(x: number, y: number, size: number) {
  if (typeof window === "undefined") {
    return { x, y };
  }

  return {
    x: Math.min(Math.max(12, x), window.innerWidth - size - 12),
    y: Math.min(Math.max(12, y), window.innerHeight - size - 12),
  };
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typedIntro, setTypedIntro] = useState("");
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0, ready: false });
  const scrollRef = useRef<HTMLDivElement>(null);
  const introAnimatedRef = useRef(false);
  const dragStateRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });

  const latestSuggestions = useMemo(() => {
    const latestAssistant = [...messages].reverse().find((message) => message.role === "assistant");

    return latestAssistant?.suggestions?.length ? latestAssistant.suggestions : assistantQuickReplies;
  }, [messages]);

  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen || introAnimatedRef.current) {
      return;
    }

    introAnimatedRef.current = true;
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setTypedIntro(introMessage.slice(0, index));

      if (index >= introMessage.length) {
        window.clearInterval(timer);
      }
    }, 14);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (bubblePosition.ready || typeof window === "undefined") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const size = getBubbleSize();
      const initialPosition = clampBubblePosition(
        window.innerWidth - size - 18,
        window.innerHeight - size - 24,
        size,
      );

      setBubblePosition({
        x: initialPosition.x,
        y: initialPosition.y,
        ready: true,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [bubblePosition.ready]);

  useEffect(() => {
    if (!bubblePosition.ready || typeof window === "undefined") {
      return;
    }

    const clampOnResize = () => {
      const size = getBubbleSize();

      setBubblePosition((current) => {
        const nextPosition = clampBubblePosition(current.x, current.y, size);

        return {
          ...current,
          x: nextPosition.x,
          y: nextPosition.y,
        };
      });
    };

    window.addEventListener("resize", clampOnResize);

    return () => window.removeEventListener("resize", clampOnResize);
  }, [bubblePosition.ready]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages: UiMessage[] = [
      ...messages,
      {
        id: createMessageId(),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as {
        message?: string;
        sources?: AssistantSourceCard[];
        suggestions?: string[];
      };

      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content:
            data.message ||
            "I don't have that detail, but I can connect you directly with the developer.",
          createdAt: new Date().toISOString(),
          sources: data.sources,
          suggestions: data.suggestions,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content:
            "I'm having trouble responding right now. You can still contact the developer directly by WhatsApp or email.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function resetDragState() {
    dragStateRef.current = {
      active: false,
      pointerId: -1,
      startX: 0,
      startY: 0,
      originX: bubblePosition.x,
      originY: bubblePosition.y,
      moved: false,
    };
  }

  function handleBubblePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: bubblePosition.x,
      originY: bubblePosition.y,
      moved: false,
    };
  }

  function handleBubblePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragStateRef.current;

    if (!drag.active || drag.pointerId !== event.pointerId || typeof window === "undefined") {
      return;
    }

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
      drag.moved = true;
    }

    const size = getBubbleSize();
    const nextPosition = clampBubblePosition(drag.originX + deltaX, drag.originY + deltaY, size);

    setBubblePosition((current) => ({
      ...current,
      x: nextPosition.x,
      y: nextPosition.y,
    }));
  }

  function handleBubblePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragStateRef.current;

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!drag.moved) {
      setIsOpen(true);
    }

    resetDragState();
  }

  function handleBubblePointerCancel() {
    resetDragState();
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      {isOpen ? (
        <div className="pointer-events-auto fixed bottom-3 left-3 right-3 sm:bottom-6 sm:left-auto sm:right-6">
          <div className="glass-panel assistant-shell flex h-[min(42rem,calc(100vh-1.5rem))] w-full flex-col overflow-hidden rounded-[2rem] border border-white/12 sm:w-[26rem]">
            <div className="assistant-topbar border-b border-white/10 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/90">AI Assistant</p>
                  <h3 className="mt-1 text-lg font-medium text-white">Consultation Chat</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:border-cyan-300/30 hover:text-white"
                >
                  Close
                </button>
              </div>
              <p className="mt-4 max-w-[18rem] text-sm leading-6 text-white/62">
                Portfolio-aware assistant for services, projects, tech stack, and hiring conversations.
              </p>
            </div>

            <div ref={scrollRef} className="assistant-scroll flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => {
                const displayContent =
                  message.id === "assistant-intro" && typedIntro && typedIntro.length < introMessage.length
                    ? typedIntro
                    : message.content;

                return (
                  <div key={message.id} className={message.role === "assistant" ? "mr-auto" : "ml-auto"}>
                    <div
                      className={`max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-7 ${
                        message.role === "assistant"
                          ? "assistant-bubble border border-white/10 bg-white/6 text-white/78"
                          : "user-bubble ml-auto bg-gradient-to-br from-cyan-400/85 to-purple-500/85 text-slate-950"
                      }`}
                    >
                      {displayContent}
                      {message.id === "assistant-intro" &&
                      typedIntro &&
                      typedIntro.length < introMessage.length ? (
                        <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-cyan-200/70 align-middle" />
                      ) : null}
                    </div>

                    <div
                      className={`mt-2 text-[11px] uppercase tracking-[0.18em] text-white/35 ${
                        message.role === "assistant" ? "text-left" : "text-right"
                      }`}
                    >
                      {message.role === "assistant" ? "Assistant" : "You"} • {formatTime(message.createdAt)}
                    </div>

                    {message.role === "assistant" && message.sources?.length ? (
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {message.sources.map((source) => (
                          <div
                            key={`${message.id}-${source.title}`}
                            className="rounded-[1.25rem] border border-white/10 bg-white/5 p-3"
                          >
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                              {source.category} Project
                            </p>
                            <h4 className="mt-2 text-sm font-medium text-white">{source.title}</h4>
                            <p className="mt-2 text-xs leading-6 text-white/58">{source.summary}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {source.stack.map((item) => (
                                <span key={item} className="assistant-source-chip">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {isLoading ? (
                <div className="mr-auto max-w-[88%] rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="assistant-dot animate-[bounce_1s_infinite]" />
                    <span className="assistant-dot animate-[bounce_1s_0.12s_infinite]" />
                    <span className="assistant-dot animate-[bounce_1s_0.24s_infinite]" />
                    <span className="ml-1 text-xs uppercase tracking-[0.18em] text-white/40">Thinking</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-4 py-4">
              <div className="assistant-chip-row mb-3 flex gap-2 overflow-x-auto pb-1">
                {latestSuggestions.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => void sendMessage(reply)}
                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 transition hover:border-cyan-300/25 hover:bg-cyan-400/8 hover:text-white"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage(input);
                    }
                  }}
                  rows={2}
                  placeholder="Ask about services, projects, pricing, or your idea..."
                  className="min-h-0 flex-1 resize-none rounded-[1.2rem] border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-300/25"
                />
                <button
                  type="button"
                  onClick={() => void sendMessage(input)}
                  disabled={isLoading}
                  className="button-primary self-end !w-auto justify-center px-4 py-3 disabled:opacity-60"
                >
                  Send
                </button>
              </div>

              <p className="mt-3 text-xs leading-6 text-white/42">
                Get in touch to discuss services, pricing, projects, or timelines. For custom pricing, please contact us directly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="pointer-events-auto fixed bottom-4 right-4 sm:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="glass-panel assistant-trigger group relative flex h-[58px] w-[58px] items-center justify-center rounded-full"
              aria-label="Open AI assistant"
            >
              <span className="assistant-trigger-core flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/90 to-purple-500/90 text-slate-950">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10.5h10" />
                  <path d="M7 14h6.5" />
                  <path d="M12 3C6.477 3 2 6.94 2 11.8c0 2.34 1.039 4.467 2.736 6.037L4.1 21l4.08-1.677A11.7 11.7 0 0 0 12 20.6c5.523 0 10-3.94 10-8.8S17.523 3 12 3Z" />
                </svg>
              </span>
              <span className="assistant-trigger-ping" aria-hidden="true" />
              <span className="assistant-trigger-badge" aria-hidden="true" />
            </button>
          </div>

          <div
            className="pointer-events-auto fixed hidden sm:block"
            style={
              bubblePosition.ready
                ? {
                    left: bubblePosition.x,
                    top: bubblePosition.y,
                  }
                : {
                    right: "1.5rem",
                    bottom: "1.5rem",
                  }
            }
          >
            <button
              type="button"
              onPointerDown={handleBubblePointerDown}
              onPointerMove={handleBubblePointerMove}
              onPointerUp={handleBubblePointerUp}
              onPointerCancel={handleBubblePointerCancel}
              className="glass-panel assistant-trigger group relative flex h-16 w-16 items-center justify-center rounded-full"
              aria-label="Open AI assistant"
            >
              <span className="assistant-trigger-core flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/90 to-purple-500/90 text-slate-950">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-[1.35rem] w-[1.35rem]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10.5h10" />
                  <path d="M7 14h6.5" />
                  <path d="M12 3C6.477 3 2 6.94 2 11.8c0 2.34 1.039 4.467 2.736 6.037L4.1 21l4.08-1.677A11.7 11.7 0 0 0 12 20.6c5.523 0 10-3.94 10-8.8S17.523 3 12 3Z" />
                </svg>
              </span>
              <span className="assistant-trigger-ping" aria-hidden="true" />
              <span className="assistant-trigger-badge" aria-hidden="true" />
              <span className="assistant-trigger-tooltip">Ask AI</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
