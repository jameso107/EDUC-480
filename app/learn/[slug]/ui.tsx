"use client";

import { useEffect, useMemo, useState } from "react";
import type { LessonModule } from "@/lib/types";

const STORAGE_PREFIX = "alp-lesson-";

export function LessonClient({
  lessonSlug,
  reflectionPrompt,
  quiz,
}: {
  lessonSlug: string;
  reflectionPrompt: string;
  quiz: LessonModule["quiz"];
}) {
  const key = `${STORAGE_PREFIX}${lessonSlug}`;
  const [reflection, setReflection] = useState("");
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        reflection?: string;
        choice?: number | null;
        submitted?: boolean;
      };
      if (typeof parsed.reflection === "string") setReflection(parsed.reflection);
      if (typeof parsed.choice === "number" || parsed.choice === null) {
        setChoice(parsed.choice ?? null);
      }
      if (parsed.submitted) setSubmitted(true);
    } catch {
      /* ignore */
    }
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ reflection, choice, submitted }),
      );
    } catch {
      /* ignore */
    }
  }, [key, reflection, choice, submitted]);

  const correct = useMemo(
    () => submitted && choice === quiz.correctIndex,
    [submitted, choice, quiz.correctIndex],
  );

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-6">
        <h2 className="text-lg font-semibold text-ink">Reflection</h2>
        <p className="mt-2 text-slate-700">{reflectionPrompt}</p>
        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="reflection">
          Your notes (private on this device)
        </label>
        <textarea
          id="reflection"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink shadow-inner"
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Quick check</h2>
        <p className="mt-2 font-medium text-slate-800">{quiz.question}</p>
        <fieldset className="mt-4 space-y-2">
          <legend className="sr-only">Answer choices</legend>
          {quiz.options.map((opt, idx) => {
            const id = `q-${lessonSlug}-${idx}`;
            return (
              <div key={id} className="flex items-start gap-2">
                <input
                  id={id}
                  type="radio"
                  name={`quiz-${lessonSlug}`}
                  checked={choice === idx}
                  onChange={() => setChoice(idx)}
                  className="mt-1"
                />
                <label htmlFor={id} className="text-sm text-slate-700">
                  {opt}
                </label>
              </div>
            );
          })}
        </fieldset>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accentMuted"
        >
          Check answer
        </button>
        {submitted && choice !== null ? (
          <p
            className={`mt-4 rounded-lg p-3 text-sm ${
              correct ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
            }`}
            role="status"
          >
            {correct ? "Nice—" : "Not quite—"}
            {quiz.explanation}
          </p>
        ) : null}
      </section>
    </div>
  );
}
