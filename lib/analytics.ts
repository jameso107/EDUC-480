export type ChatIntentCategory =
  | "learning_support"
  | "borderline"
  | "integrity_risk"
  | "unknown";

const RISK = /\b(write|complete|finish|answer key|test|quiz|exam|for me|plagiar|undetect)\b/i;
const BORDER = /\b(summarize|translate|solve all|entire essay|full paragraph)\b/i;
const LEARN = /\b(explain|hint|quiz|practice|brainstorm|feedback|outline|check my|why|how does)\b/i;

export function categorizeStudentMessage(text: string): ChatIntentCategory {
  const t = text.toLowerCase();
  if (RISK.test(t)) return "integrity_risk";
  if (BORDER.test(t)) return "borderline";
  if (LEARN.test(t)) return "learning_support";
  return "unknown";
}
