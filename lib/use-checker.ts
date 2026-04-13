import type { UseCheckerVerdict } from "./types";

export interface CheckerResult {
  verdict: UseCheckerVerdict;
  title: string;
  summary: string;
  alternative?: string;
}

const INAPPROPRIATE_PATTERNS: { test: RegExp; note: string }[] = [
  {
    test: /\b(write|complete|finish|do)\b.*\b(essay|paper|lab report|homework|worksheet|assignment)\b/i,
    note: "outsourcing graded writing or full assignments",
  },
  {
    test: /\b(test|quiz|exam)\b.*\b(answer|solutions?|key)\b/i,
    note: "assessment answers",
  },
  {
    test: /\b(cheat|plagiar|undetect|without (my )?teacher knowing)\b/i,
    note: "evading integrity expectations",
  },
  {
    test: /\b(summarize|summary)\b.*\b((didn'?t|haven'?t) read|instead of reading)\b/i,
    note: "replacing assigned reading",
  },
];

const CAUTION_PATTERNS: { test: RegExp; note: string }[] = [
  {
    test: /\btranslate\b|\bsummar(y|ize)\b/i,
    note: "translation or summarization can be yellow-light depending on the assignment",
  },
  {
    test: /\bcode\b|\bprogram\b|\bdebug\b/i,
    note: "coding help varies widely by course policy",
  },
  {
    test: /\bmath\b|\bsolve\b|\bstep(s)?\b/i,
    note: "math assistance is supportive with your attempt shown first",
  },
];

const POSITIVE_PATTERNS =
  /\b(quiz|practice|hint|explain|brainstorm|outline|feedback|revise|check my|study|flashcard|questions?)\b/i;

export function classifyUseDescription(input: string): CheckerResult {
  const text = input.trim();
  if (text.length < 8) {
    return {
      verdict: "caution",
      title: "Add a bit more detail",
      summary:
        "Try describing the assignment type, what you already tried, and what you want AI to do.",
      alternative:
        "Example: “I read the chapter and want AI to quiz me on the hardest section.”",
    };
  }

  for (const { test, note } of INAPPROPRIATE_PATTERNS) {
    if (test.test(text)) {
      return {
        verdict: "inappropriate",
        title: "Likely inappropriate",
        summary: `This sounds like ${note}. That often conflicts with academic integrity because it replaces the learning or assessment your teacher intended.`,
        alternative:
          "Try sharing your draft or attempt first, then ask for hints, questions, or feedback on a specific stuck point. If you are unsure, ask your teacher before using AI.",
      };
    }
  }

  let cautionHit: string | undefined;
  for (const { test, note } of CAUTION_PATTERNS) {
    if (test.test(text)) {
      cautionHit = note;
      break;
    }
  }

  if (cautionHit && !POSITIVE_PATTERNS.test(text)) {
    return {
      verdict: "caution",
      title: "Use with caution",
      summary: `${cautionHit.charAt(0).toUpperCase()}${cautionHit.slice(1)}. Check your teacher’s rules and whether this would replace work you are supposed to do yourself.`,
      alternative:
        "Add guardrails: show your attempt, ask for a learning move (explain, quiz, hint), and verify facts in class materials.",
    };
  }

  if (POSITIVE_PATTERNS.test(text)) {
    return {
      verdict: "responsible",
      title: "Looks responsible (general guidance)",
      summary:
        "You described a learning-oriented use like quizzing, explaining, brainstorming, or feedback. Still confirm your teacher allows AI for this task.",
    };
  }

  return {
    verdict: "caution",
    title: "Use with caution",
    summary:
      "This description is not clearly harmful, but it is also not clearly limited to learning support. Add what you already tried and what kind of help you want.",
    alternative:
      "Try: “I wrote a thesis sentence—can you ask me two questions to strengthen it?”",
  };
}
