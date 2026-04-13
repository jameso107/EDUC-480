import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice",
  description: "Scenarios and prompt rewriting for responsible AI use.",
};

export default function PracticeHubPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Practice</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Build judgment with realistic school scenarios and prompt rewriting.
          Progress saves lightly in your browser on this device.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/practice/scenarios"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent/40"
        >
          <h2 className="text-lg font-semibold text-ink">Scenario cards</h2>
          <p className="mt-2 text-sm text-slate-600">
            Decide if each use is responsible, questionable, or unethical, then
            read why.
          </p>
        </Link>
        <Link
          href="/practice/prompts"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent/40"
        >
          <h2 className="text-lg font-semibold text-ink">Prompt rewriting</h2>
          <p className="mt-2 text-sm text-slate-600">
            Turn risky prompts into learning-focused ones with guided feedback.
          </p>
        </Link>
      </div>
    </div>
  );
}
