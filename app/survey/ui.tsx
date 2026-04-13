"use client";

import { useState } from "react";
import type { Likert } from "@/lib/survey-payload";

const likertQuestions: {
  name: keyof Pick<
    FormState,
    "clarityResponsibleVsProblematic" | "confidenceEthicalUse" | "promptLearningFocus"
  >;
  label: string;
}[] = [
  {
    name: "clarityResponsibleVsProblematic",
    label:
      "I have a clearer sense of when AI use is responsible vs problematic for school.",
  },
  {
    name: "confidenceEthicalUse",
    label: "My confidence in using AI ethically for school has improved after using this site.",
  },
  {
    name: "promptLearningFocus",
    label:
      "I am better at asking for learning-focused help (hints, questions, feedback) instead of outsourcing finished work.",
  },
];

const likertOptions: Likert[] = ["1", "2", "3", "4", "5"];

const likertShort: Record<Likert, string> = {
  "1": "SD",
  "2": "D",
  "3": "N",
  "4": "A",
  "5": "SA",
};

type FormState = {
  clarityResponsibleVsProblematic: Likert | "";
  confidenceEthicalUse: Likert | "";
  promptLearningFocus: Likert | "";
  responsibleAiMeaning: string;
  habitGoingForward: string;
  schoolsApproach: string;
  additionalComments: string;
  company: string;
};

const initial: FormState = {
  clarityResponsibleVsProblematic: "",
  confidenceEthicalUse: "",
  promptLearningFocus: "",
  responsibleAiMeaning: "",
  habitGoingForward: "",
  schoolsApproach: "",
  additionalComments: "",
  company: "",
};

export function SurveyForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clarityResponsibleVsProblematic: form.clarityResponsibleVsProblematic,
          confidenceEthicalUse: form.confidenceEthicalUse,
          promptLearningFocus: form.promptLearningFocus,
          responsibleAiMeaning: form.responsibleAiMeaning,
          habitGoingForward: form.habitGoingForward,
          schoolsApproach: form.schoolsApproach || undefined,
          additionalComments: form.additionalComments || undefined,
          company: form.company,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("Thank you—your responses were submitted.");
      setForm(initial);
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  const disabled =
    status === "submitting" ||
    !form.clarityResponsibleVsProblematic ||
    !form.confidenceEthicalUse ||
    !form.promptLearningFocus ||
    form.responsibleAiMeaning.trim().length < 10 ||
    form.habitGoingForward.trim().length < 10;

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <fieldset className="space-y-8">
        <legend className="text-base font-semibold text-ink">Skills and understanding</legend>
        <p className="text-sm text-slate-600">
          Scale: SD = strongly disagree, D = disagree, N = neutral, A = agree, SA = strongly
          agree.
        </p>
        {likertQuestions.map((q) => (
          <div key={q.name}>
            <p className="text-sm font-medium text-slate-800" id={`label-${q.name}`}>
              {q.label}
            </p>
            <div
              className="mt-2 flex flex-wrap gap-2"
              role="group"
              aria-labelledby={`label-${q.name}`}
            >
              {likertOptions.map((v) => {
                const id = `${q.name}-${v}`;
                return (
                  <label
                    key={id}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${
                      form[q.name] === v
                        ? "border-accent bg-accent/10 font-medium text-accent"
                        : "border-slate-300 text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.name}
                      value={v}
                      checked={form[q.name] === v}
                      onChange={() => setForm((f) => ({ ...f, [q.name]: v }))}
                      className="sr-only"
                    />
                    <span title={v}>{likertShort[v]}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="meaning" className="text-sm font-medium text-slate-800">
          In your own words, what does <span className="italic">responsible AI use</span> mean
          to you now?
        </label>
        <textarea
          id="meaning"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
          value={form.responsibleAiMeaning}
          onChange={(e) => setForm((f) => ({ ...f, responsibleAiMeaning: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink shadow-inner"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="habit" className="text-sm font-medium text-slate-800">
          What is one habit or rule you will follow when using AI for school going forward?
        </label>
        <textarea
          id="habit"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
          value={form.habitGoingForward}
          onChange={(e) => setForm((f) => ({ ...f, habitGoingForward: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink shadow-inner"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="schools" className="text-sm font-medium text-slate-800">
          What is your opinion on how schools should approach AI with students? (optional)
        </label>
        <textarea
          id="schools"
          maxLength={4000}
          rows={4}
          value={form.schoolsApproach}
          onChange={(e) => setForm((f) => ({ ...f, schoolsApproach: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink shadow-inner"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="extra" className="text-sm font-medium text-slate-800">
          Anything else you want us to know? (optional)
        </label>
        <textarea
          id="extra"
          maxLength={4000}
          rows={3}
          value={form.additionalComments}
          onChange={(e) => setForm((f) => ({ ...f, additionalComments: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink shadow-inner"
        />
      </div>

      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        />
      </div>

      {status === "error" && message ? (
        <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-900" role="alert">
          {message}
        </p>
      ) : null}
      {status === "success" && message ? (
        <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900" role="status">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accentMuted disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "submitting" ? "Submitting…" : "Submit survey"}
      </button>
    </form>
  );
}
