import type { PromptExercise } from "./types";

export const promptExercises: PromptExercise[] = [
  {
    id: "civil-war-paragraph",
    badPrompt: "Write my paragraph about the causes of the Civil War.",
    hints: [
      "Say what you already believe the causes are.",
      "Ask for questions or a mini-outline, not finished prose.",
      "Ask the AI to push back on your reasoning.",
    ],
    idealPrompt:
      "I think economics, slavery expansion, and state rights all mattered. Ask me probing questions so I can strengthen my own paragraph draft.",
    rationale:
      "You keep authorship and invite coaching instead of outsourcing the paragraph.",
  },
  {
    id: "chem-balancing",
    badPrompt: "Balance every equation on my worksheet and give final answers.",
    hints: [
      "Try one equation and show where you got stuck.",
      "Ask for a hint about a specific step.",
      "Ask the AI to check your work and explain mistakes.",
    ],
    idealPrompt:
      "I balanced H2 + O2 -> H2O as ... but I am unsure about the oxygen count—what should I double-check?",
    rationale:
      "You attempt the work first and target a specific conceptual slip.",
  },
  {
    id: "lit-quotes",
    badPrompt: "Find quotes that prove my thesis and write analysis I can paste.",
    hints: [
      "Share your thesis in your own words.",
      "Ask where to look in the text or what kinds of evidence to hunt for.",
      "Write your analysis first, then ask for feedback.",
    ],
    idealPrompt:
      "My thesis is that guilt drives the protagonist’s choices. What passages should I re-read, and what questions should I ask myself about each?",
    rationale:
      "You still locate evidence and write analysis; AI supports reading strategy.",
  },
];
