import type { Scenario } from "./types";

export const scenarios: Scenario[] = [
  {
    id: "eng-essay-feedback",
    subject: "English",
    text: "You have an essay due tomorrow. You already wrote a draft and ask the AI: “Can you tell me where my argument is unclear?”",
    correct: "responsible",
    explanation:
      "You kept authorship and asked for feedback on your own draft—this supports revision and critical thinking.",
  },
  {
    id: "hist-essay-full",
    subject: "History",
    text: "You ask the AI: “Write my entire DBQ response using these documents so I can submit it.”",
    correct: "unethical",
    explanation:
      "This outsources the writing and analysis your teacher is assessing. A better path is outlining your own claims and asking for questions to strengthen evidence use.",
  },
  {
    id: "math-hw-copy",
    subject: "Math",
    text: "You photograph every homework problem and paste the AI answers directly into the worksheet without trying them first.",
    correct: "unethical",
    explanation:
      "This replaces your practice. Try the problem, show your steps, then ask for a hint on the specific stuck point.",
  },
  {
    id: "sci-lab-brainstorm",
    subject: "Science",
    text: "After running an experiment, you ask the AI: “What are three common reasons results might differ from predictions?” and you connect them to your own data.",
    correct: "responsible",
    explanation:
      "You are using AI to spark ideas you still have to evaluate against your actual results.",
  },
  {
    id: "fl-translate-assigned-reading",
    subject: "Foreign language",
    text: "Your teacher assigned a short story in Spanish. You paste the whole story into AI for an English summary instead of reading.",
    correct: "questionable",
    explanation:
      "If the goal is reading comprehension, summarizing can replace learning. If your teacher allows support tools, a better use might be glossing hard sentences after you try first.",
  },
  {
    id: "eng-brainstorm-thesis",
    subject: "English",
    text: "You ask the AI for five possible thesis ideas for a prompt, then pick one and write the essay yourself.",
    correct: "responsible",
    explanation:
      "Brainstorming is a common green-light use when your teacher allows AI for ideation and you still do the drafting.",
  },
  {
    id: "hist-quiz-answers",
    subject: "History",
    text: "During an in-class quiz, you message an AI for the answers on your phone.",
    correct: "unethical",
    explanation:
      "This is cheating on an assessment and breaks classroom trust.",
  },
  {
    id: "sci-bio-conclusion",
    subject: "Science",
    text: "You ask the AI: “Write my biology conclusion paragraph for me to turn in.”",
    correct: "unethical",
    explanation:
      "You can ask for sentence starters, checklists, or feedback on a draft you wrote, but final prose should be yours.",
  },
  {
    id: "math-quiz-me",
    subject: "Math",
    text: "After class, you ask the AI to generate five practice problems like the ones you missed and you solve them on paper.",
    correct: "responsible",
    explanation:
      "Extra practice with verification supports learning without outsourcing graded work.",
  },
  {
    id: "eng-peer-review",
    subject: "English",
    text: "Your teacher asked for peer feedback. You use AI to write the peer feedback comments without reading your classmate’s essay.",
    correct: "unethical",
    explanation:
      "Peer review is about your engagement with a classmate’s ideas. Using AI to fake that engagement is dishonest.",
  },
  {
    id: "sci-data-explain",
    subject: "Science",
    text: "You graph your own lab data and ask the AI to explain what the trend might mean in plain language, then you rewrite it in your words with citations from class.",
    correct: "responsible",
    explanation:
      "You start from your data and use AI as a language helper while you still own interpretation and verification.",
  },
  {
    id: "fl-conversation-practice",
    subject: "Foreign language",
    text: "You practice a dialogue with AI and ask it to correct your grammar after each reply you write.",
    correct: "responsible",
    explanation:
      "You are producing the language and using feedback to improve—similar to tutoring when allowed.",
  },
  {
    id: "hist-outline-notes",
    subject: "History",
    text: "You paste your class notes into AI and ask it to turn them into a study outline, then you quiz yourself from the outline.",
    correct: "responsible",
    explanation:
      "Reformatting your own notes into a study tool can support learning, especially if you still do the recall practice.",
  },
  {
    id: "math-test-solutions",
    subject: "Math",
    text: "You take a photo of tomorrow’s test review sheet and ask AI for full solutions to memorize.",
    correct: "questionable",
    explanation:
      "Memorizing solutions without understanding is fragile and can become dishonest if it crosses into graded work. Focus on why each step works.",
  },
  {
    id: "eng-rewrite-voice",
    subject: "English",
    text: "You paste your paragraph and ask AI to “make it sound smarter” and submit the rewritten version as entirely yours without noting help.",
    correct: "unethical",
    explanation:
      "If the final prose is not yours, that is misrepresentation. Ask for feedback on clarity while keeping your sentences.",
  },
];
