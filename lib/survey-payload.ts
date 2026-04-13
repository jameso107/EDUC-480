/** Shared shape for the post-survey (client → Formspree). */

export type Likert = "1" | "2" | "3" | "4" | "5";

export interface SurveyPayload {
  /** Clearer sense: responsible vs problematic */
  clarityResponsibleVsProblematic: Likert;
  /** Confidence using AI ethically */
  confidenceEthicalUse: Likert;
  /** Better at learning-focused prompts */
  promptLearningFocus: Likert;
  /** What responsible AI use means to them */
  responsibleAiMeaning: string;
  /** One habit or rule going forward */
  habitGoingForward: string;
  /** Opinion on how schools should approach AI */
  schoolsApproach?: string;
  /** Optional free text */
  additionalComments?: string;
}

export const LIKERT_LABELS: Record<Likert, string> = {
  "1": "Strongly disagree",
  "2": "Disagree",
  "3": "Neutral",
  "4": "Agree",
  "5": "Strongly agree",
};

export function isLikert(v: unknown): v is Likert {
  return v === "1" || v === "2" || v === "3" || v === "4" || v === "5";
}
