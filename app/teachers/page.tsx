import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Teachers",
  description: "Educator overview, guardrails, and classroom framing for AI Learning Playbook.",
};

export default function TeachersPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">For teachers and schools</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          AI Learning Playbook is a student-facing literacy intervention: it
          teaches judgment, transparency, and integrity-minded habits. It is not a
          workaround for school policy or blocked tools.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Educational purpose</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          <li>Concrete examples of support versus outsourcing</li>
          <li>Interactive practice with explanations</li>
          <li>A coach role-modeled in system instructions, not an unconstrained chatbot</li>
          <li>Explicit reminders that classroom rules override site guidance</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Chatbot guardrails</h2>
        <p className="mt-3 text-slate-700">
          The server attaches a strict system prompt that refuses final-submission
          writing, homework completion, and test answers; it redirects to hints,
          questions, and draft feedback. When no API key is present, the chat
          explains that live coaching is disabled rather than silently failing.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Analytics: the API logs a coarse intent category (for example,
          learning support vs integrity risk) based on keyword signals, not full
          transcript storage by default on this site.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Classroom use ideas</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          <li>Assign two modules, then debrief with a discussion on yellow-light cases</li>
          <li>Use scenario cards as a warm-up bell ringer</li>
          <li>Have students bring a real prompt to rewrite in pairs, then compare with the site examples</li>
          <li>Use “Is This Okay?” as a think-pair-share before a drafting day</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Sample policy language (adapt freely)</h2>
        <blockquote className="mt-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-800">
          Students may use AI only in ways that support their own thinking and
          learning. Using AI to generate work you submit as entirely your own,
          or to obtain assessment answers, is not permitted. When unsure,
          disclose your use and ask for clarification before relying on a tool.
        </blockquote>
      </section>
    </div>
  );
}
