"use client";

import { useState } from "react";
import { buildSurveyEmailText } from "@/lib/survey-email";
import { DEFAULT_FORMSPREE_SURVEY_URL } from "@/lib/survey-form-endpoint";
import { isLikert, type Likert, type SurveyPayload } from "@/lib/survey-payload";

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

const likertLegend: Record<Likert, string> = {
  "1": "Strongly disagree",
  "2": "Disagree",
  "3": "Neutral",
  "4": "Agree",
  "5": "Strongly agree",
};

type FormState = {
  clarityResponsibleVsProblematic: Likert | "";
  confidenceEthicalUse: Likert | "";
  promptLearningFocus: Likert | "";
  responsibleAiMeaning: string;
  habitGoingForward: string;
  schoolsApproach: string;
  additionalComments: string;
  /** Honeypot: must stay empty (avoid name "company" or browsers autofill it). */
  alpHp: string;
};

const initial: FormState = {
  clarityResponsibleVsProblematic: "",
  confidenceEthicalUse: "",
  promptLearningFocus: "",
  responsibleAiMeaning: "",
  habitGoingForward: "",
  schoolsApproach: "",
  additionalComments: "",
  alpHp: "",
};

const MIN_PARAGRAPH = 10;

function validate(form: FormState): string | null {
  if (!form.clarityResponsibleVsProblematic) {
    return "Please choose an answer for all three scale questions (the SD to SA rows).";
  }
  if (!form.confidenceEthicalUse) {
    return "Please choose an answer for all three scale questions (the SD to SA rows).";
  }
  if (!form.promptLearningFocus) {
    return "Please choose an answer for all three scale questions (the SD to SA rows).";
  }
  if (form.responsibleAiMeaning.trim().length < MIN_PARAGRAPH) {
    return `The “responsible AI use” answer needs at least ${MIN_PARAGRAPH} characters.`;
  }
  if (form.habitGoingForward.trim().length < MIN_PARAGRAPH) {
    return `The “habit or rule” answer needs at least ${MIN_PARAGRAPH} characters.`;
  }
  return null;
}

function toPayload(form: FormState): SurveyPayload | null {
  const a = form.clarityResponsibleVsProblematic;
  const b = form.confidenceEthicalUse;
  const c = form.promptLearningFocus;
  if (!isLikert(a) || !isLikert(b) || !isLikert(c)) return null;
  const meaning = form.responsibleAiMeaning.trim();
  const habit = form.habitGoingForward.trim();
  if (meaning.length < MIN_PARAGRAPH || habit.length < MIN_PARAGRAPH) return null;
  const schools = form.schoolsApproach.trim();
  const extra = form.additionalComments.trim();
  return {
    clarityResponsibleVsProblematic: a,
    confidenceEthicalUse: b,
    promptLearningFocus: c,
    responsibleAiMeaning: meaning,
    habitGoingForward: habit,
    schoolsApproach: schools || undefined,
    additionalComments: extra || undefined,
  };
}

export function SurveyForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (form.alpHp.trim() !== "") {
      setStatus("success");
      setMessage("Thank you. Your responses were submitted.");
      return;
    }

    const err = validate(form);
    if (err) {
      setStatus("error");
      setMessage(err);
      return;
    }

    const payload = toPayload(form);
    if (!payload) {
      setStatus("error");
      setMessage("Something is incomplete. Check the scale questions and both short answers.");
      return;
    }

    setStatus("submitting");
    const submittedAt = new Date().toISOString();
    const subject = `[Playbook Post-Survey] ${submittedAt.slice(0, 10)}`;
    const messageBody = buildSurveyEmailText(payload, { submittedAt });

    try {
      const res = await fetch(DEFAULT_FORMSPREE_SURVEY_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: subject,
          message: messageBody,
          _gotcha: "",
        }),
      });

      let data: { ok?: boolean; error?: string } = {};
      try {
        data = (await res.json()) as { ok?: boolean; error?: string };
      } catch {
        /* ignore */
      }

      if (!res.ok) {
        setStatus("error");
        setMessage(
          typeof data.error === "string"
            ? data.error
            : "The form could not be sent. Check your connection or try again in a moment.",
        );
        return;
      }

      setStatus("success");
      setMessage("Thank you. Your responses were submitted.");
      setForm(initial);
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
        To submit: choose <strong>one circle per row</strong> (SD → SA), then write at least{" "}
        {MIN_PARAGRAPH} characters in each of the two boxes below.
      </p>

      <fieldset className="space-y-8">
        <legend className="text-base font-semibold text-ink">Skills and understanding</legend>
        <p className="text-sm text-slate-600">
          SD = strongly disagree · D = disagree · N = neutral · A = agree · SA = strongly agree.
          Tap a circle or its label.
        </p>
        {likertQuestions.map((q) => (
          <div key={q.name}>
            <p className="text-sm font-medium text-slate-800" id={`label-${q.name}`}>
              {q.label}
            </p>
            <div
              className="mt-2 flex flex-wrap gap-2"
              role="radiogroup"
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
                    title={likertLegend[v]}
                  >
                    <input
                      type="radio"
                      name={q.name}
                      value={v}
                      checked={form[q.name] === v}
                      onChange={() => setForm((f) => ({ ...f, [q.name]: v }))}
                      className="h-4 w-4 shrink-0 border-slate-300 text-accent focus:ring-accent"
                    />
                    <span>
                      {likertShort[v]}{" "}
                      <span className="text-xs font-normal text-slate-500">({likertLegend[v]})</span>
                    </span>
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
          minLength={MIN_PARAGRAPH}
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
          minLength={MIN_PARAGRAPH}
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

      <div
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="alp-hp">Leave blank</label>
        <input
          id="alp-hp"
          name="alp_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.alpHp}
          onChange={(e) => setForm((f) => ({ ...f, alpHp: e.target.value }))}
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
        disabled={submitting}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accentMuted disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit survey"}
      </button>
    </form>
  );
}
