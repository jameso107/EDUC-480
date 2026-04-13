"use client";

import { useMemo, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER: Msg = {
  role: "assistant",
  content:
    "Hi! I am here to coach learning, not to replace it. What topic are you working on, what have you tried so far, and what kind of help would help you think (explain, quiz, hint, brainstorm, or feedback on your draft)?",
};

export function ChatClient() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([STARTER]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const transcript = useMemo(
    () =>
      messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    [messages],
  );

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setNotice(null);
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; mode?: string };
      const reply =
        data.reply ??
        "I could not read the coach response. Please try again in a moment.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (data.mode === "offline") {
        setNotice(
          "Demo mode: add OPENAI_API_KEY on the server (see .env.example) to enable the live model.",
        );
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Network error talking to the coach endpoint. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {notice ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {notice}
        </p>
      ) : null}
      <div
        className="flex h-[min(520px,70vh)] flex-col rounded-xl border border-slate-200 bg-white shadow-sm"
        aria-live="polite"
      >
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {transcript.map((m, i) => (
            <div
              key={`${i}-${m.role}`}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-accent text-white"
                  : "mr-auto bg-slate-100 text-slate-900"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading ? (
            <p className="text-sm text-slate-500">Coach is thinking…</p>
          ) : null}
        </div>
        <div className="border-t border-slate-200 p-3">
          <label className="sr-only" htmlFor="chat-input">
            Message
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <textarea
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="Example: I wrote a thesis sentence about Macbeth. Can you ask me two questions to strengthen it?"
              className="min-h-[44px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink shadow-inner"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading || !input.trim()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition enabled:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Do not paste private information. For assessments, follow your
            teacher&apos;s rules about tools.
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-600">
        Reflection prompt: After a helpful reply, could you explain the idea in
        your own words without looking?
      </p>
    </div>
  );
}
