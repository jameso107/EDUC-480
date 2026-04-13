"use client";

import { useEffect, useMemo, useState } from "react";
import type { Scenario, ScenarioChoice } from "@/lib/types";

const STORAGE_KEY = "alp-scenarios-v1";

type Progress = Record<string, { choice: ScenarioChoice; revealed: boolean }>;

const choices: { id: ScenarioChoice; label: string }[] = [
  { id: "responsible", label: "Responsible" },
  { id: "questionable", label: "Questionable" },
  { id: "unethical", label: "Unethical" },
];

export function ScenariosClient({ scenarios }: { scenarios: Scenario[] }) {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw) as Progress);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* ignore */
    }
  }, [progress]);

  const completed = useMemo(
    () => scenarios.filter((s) => progress[s.id]?.revealed).length,
    [progress, scenarios],
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600" aria-live="polite">
        Progress: {completed} / {scenarios.length} reviewed
      </p>
      <ul className="space-y-5">
        {scenarios.map((s) => {
          const state = progress[s.id];
          const selected = state?.choice;
          const revealed = state?.revealed;
          const correct = selected === s.correct;

          return (
            <li
              key={s.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span>{s.subject}</span>
              </div>
              <p className="mt-2 text-slate-800">{s.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {choices.map((c) => {
                  const active = selected === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        setProgress((p) => ({
                          ...p,
                          [s.id]: { choice: c.id, revealed: false },
                        }))
                      }
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                        active
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-slate-300 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setProgress((p) => ({
                      ...p,
                      [s.id]: { choice: selected ?? "questionable", revealed: true },
                    }))
                  }
                  disabled={!selected}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition enabled:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Show explanation
                </button>
              </div>
              {revealed ? (
                <p
                  className={`mt-4 rounded-lg p-3 text-sm ${
                    correct ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"
                  }`}
                  role="status"
                >
                  {correct ? "Match: " : "Learning moment: "}
                  {s.explanation}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
