import type { SurveyPayload } from "./survey-payload";
import { LIKERT_LABELS } from "./survey-payload";

function formatLikert(v: keyof typeof LIKERT_LABELS) {
  return `${v}: ${LIKERT_LABELS[v]}`;
}

/** Plain-text body suitable for a “contact form” email (Formspree, etc.). */
export function buildSurveyEmailText(p: SurveyPayload, meta: { submittedAt: string }) {
  const lines = [
    "AI Learning Playbook: post-survey",
    "",
    `Submitted at (UTC): ${meta.submittedAt}`,
    "",
    `Clearer sense of responsible vs problematic AI use for school: ${formatLikert(p.clarityResponsibleVsProblematic)}`,
    `Confidence using AI ethically has improved: ${formatLikert(p.confidenceEthicalUse)}`,
    `Better at learning-focused prompts: ${formatLikert(p.promptLearningFocus)}`,
    "",
    "What “responsible AI use” means now:",
    p.responsibleAiMeaning,
    "",
    "One habit or rule going forward:",
    p.habitGoingForward,
    "",
  ];
  if (p.schoolsApproach?.trim()) {
    lines.push("How schools should approach AI (opinion):", p.schoolsApproach.trim(), "");
  }
  if (p.additionalComments?.trim()) {
    lines.push("Additional comments:", p.additionalComments.trim(), "");
  }
  return lines.join("\n");
}
