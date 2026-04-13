"use client";

import { useState } from "react";
import type { PromptExercise } from "@/lib/types";

export function PromptsClient({ exercises }: { exercises: PromptExercise[] }) {
  const [index, setIndex] = useState(0);
  const ex: PromptExercise = exercises[index];
  const [draft, setDraft] = useState("");
  const [showIdeal, setShowIdeal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <span>
          Exercise {index + 1} of {exercises.length}
        </span>
      </div>

      <section className="rounded-xl border border-rose-200 bg-rose-50/60 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-800">
          Risky prompt
        </h2>
        <p className="mt-2 text-slate-900">&ldquo;{ex.badPrompt}&rdquo;</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Your rewrite</h2>
        <p className="mt-2 text-sm text-slate-600">
          Aim for learning moves: show your attempt, ask for questions, hints,
          brainstorming, or feedback, not finished submission text.
        </p>
        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="rewrite">
          Revised prompt
        </label>
        <textarea
          id="rewrite"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink shadow-inner"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowIdeal(true)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accentMuted"
          >
            Compare with a strong example
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft("");
              setShowIdeal(false);
            }}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink"
          >
            Clear
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-ink">Hints to try</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
          {ex.hints.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      {showIdeal ? (
        <section className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6">
          <h2 className="text-lg font-semibold text-ink">Strong example</h2>
          <p className="mt-2 text-slate-900">&ldquo;{ex.idealPrompt}&rdquo;</p>
          <p className="mt-3 text-sm text-slate-700">{ex.rationale}</p>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => {
            setIndex((i) => Math.max(0, i - 1));
            setDraft("");
            setShowIdeal(false);
          }}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={index >= exercises.length - 1}
          onClick={() => {
            setIndex((i) => Math.min(exercises.length - 1, i + 1));
            setDraft("");
            setShowIdeal(false);
          }}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
