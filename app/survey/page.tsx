import type { Metadata } from "next";
import { SurveyForm } from "./ui";

export const metadata: Metadata = {
  title: "Post-survey",
  description:
    "Reflect on AI skills and responsible use after using AI Learning Playbook.",
};

export default function SurveyPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Post-survey</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This short survey helps measure how your understanding and skills around
          responsible AI may have changed.
        </p>
      </header>
      <SurveyForm />
    </div>
  );
}
