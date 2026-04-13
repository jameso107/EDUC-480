import type { Metadata } from "next";
import { promptExercises } from "@/lib/prompt-exercises";
import { PromptsClient } from "./ui";

export const metadata: Metadata = {
  title: "Prompt rewriting",
  description: "Practice turning risky prompts into learning-focused prompts.",
};

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Prompt rewriting
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Read the risky prompt, write your own improvement, then compare with a
          strong example. This is practice, not automatic grading of every possible
          good answer.
        </p>
      </header>
      <PromptsClient exercises={promptExercises} />
    </div>
  );
}
