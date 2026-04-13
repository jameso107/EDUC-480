export type TrafficLight = "green" | "yellow" | "red";

export type ScenarioChoice = "responsible" | "questionable" | "unethical";

export interface LessonModule {
  slug: string;
  title: string;
  summary: string;
  readingLevel: string;
  sections: { heading: string; body: string; example?: string }[];
  reflectionPrompt: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Scenario {
  id: string;
  subject: string;
  text: string;
  correct: ScenarioChoice;
  explanation: string;
}

export interface PromptExercise {
  id: string;
  badPrompt: string;
  hints: string[];
  idealPrompt: string;
  rationale: string;
}

export type UseCheckerVerdict = "responsible" | "caution" | "inappropriate";
