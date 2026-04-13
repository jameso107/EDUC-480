import type { Metadata } from "next";
import { ChatClient } from "./ui";

export const metadata: Metadata = {
  title: "Chat",
  description: "Ethical learning coach chat: hints and questions, not answer outsourcing.",
};

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Chat with the Ethical Learning Coach
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This coach is designed to support studying: explanations, hints,
          quizzing, brainstorming, and feedback on your drafts. It should refuse
          requests to do graded work for you. Your teacher&apos;s rules always
          come first.
        </p>
      </header>
      <ChatClient />
    </div>
  );
}
