"use client";

import { useState } from "react";
import { classifyUseDescription } from "@/lib/use-checker";
import type { UseCheckerVerdict } from "@/lib/types";

const badge: Record<UseCheckerVerdict, string> = {
  responsible: "bg-emerald-100 text-emerald-900 border-emerald-200",
  caution: "bg-amber-100 text-amber-900 border-amber-200",
  inappropriate: "bg-rose-100 text-rose-900 border-rose-200",
};

export function CheckerClient() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof classifyUseDescription> | null>(
    null,
  );

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="text-sm font-medium text-slate-800" htmlFor="use-desc">
          Describe your planned AI use
        </label>
        <textarea
          id="use-desc"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink shadow-inner"
          placeholder='Example: "I read the chapter and want AI to quiz me on the hardest section."'
        />
        <button
          type="button"
          onClick={() => setResult(classifyUseDescription(text))}
          className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accentMuted"
        >
          Get feedback
        </button>
      </section>

      {result ? (
        <section
          className={`rounded-xl border p-6 ${badge[result.verdict]}`}
          aria-live="polite"
        >
          <h2 className="text-lg font-semibold">{result.title}</h2>
          <p className="mt-2 text-sm leading-relaxed">{result.summary}</p>
          {result.alternative ? (
            <p className="mt-3 text-sm leading-relaxed">
              <span className="font-semibold">Try this angle: </span>
              {result.alternative}
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
