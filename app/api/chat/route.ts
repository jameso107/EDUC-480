import { categorizeStudentMessage } from "@/lib/analytics";
import { ETHICAL_CHATBOT_SYSTEM } from "@/lib/chat-system";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const OFFLINE_REPLY =
  "The live coach is not configured yet (missing API key on the server). You can still use Learn and Practice. When enabled, this coach will ask guiding questions, give hints, and refuse to complete graded work for you.";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = (body as { messages?: ChatMessage[] }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages[] required" }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (lastUser?.content) {
    const category = categorizeStudentMessage(lastUser.content);
    console.info("[alp-chat-category]", category);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: OFFLINE_REPLY,
      mode: "offline",
    });
  }

  const base =
    process.env.OPENAI_BASE_URL?.replace(/\/$/, "") ?? "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const outbound: ChatMessage[] = [
    { role: "system", content: ETHICAL_CHATBOT_SYSTEM },
    ...messages.filter((m) => m.role !== "system"),
  ];

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        messages: outbound,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[alp-chat-upstream]", res.status, errText);
      return NextResponse.json(
        {
          reply:
            "The coach could not reach the model provider just now. Please try again in a moment.",
          mode: "error",
        },
        { status: 200 },
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { reply: "I did not get a usable response. Please try again.", mode: "error" },
        { status: 200 },
      );
    }

    return NextResponse.json({ reply, mode: "live" });
  } catch (e) {
    console.error("[alp-chat]", e);
    return NextResponse.json(
      {
        reply:
          "Something went wrong contacting the model. Please try again later.",
        mode: "error",
      },
      { status: 200 },
    );
  }
}
