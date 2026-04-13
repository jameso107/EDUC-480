import type { LessonModule } from "./types";

export const lessons: LessonModule[] = [
  {
    slug: "ai-tutor-vs-shortcut",
    title: "AI as a tutor vs AI as a shortcut",
    summary:
      "Learn when AI supports your thinking and when it replaces the learning your teacher intended.",
    readingLevel: "High school",
    sections: [
      {
        heading: "What AI can do well for school",
        body: "AI can explain ideas in new words, ask you questions, suggest study plans, quiz you, and help you notice gaps in a draft you already wrote. Those uses keep you in charge of the final ideas and evidence.",
        example:
          "Good fit: “I tried this problem and got stuck at step 2. Can you ask me a guiding question?”",
      },
      {
        heading: "When AI becomes a shortcut",
        body: "If AI does the thinking you were assigned to do (like drafting a full essay you submit as your own, solving every problem without your work, or giving answers during an assessment), that usually crosses into cheating or academic dishonesty.",
        example:
          "Risky: “Write my entire lab conclusion so I can paste it.”",
      },
      {
        heading: "A simple test",
        body: "Ask yourself: “Could I explain this to a classmate without the AI?” If the honest answer is no, pause and try a smaller step with AI that builds understanding instead of outsourcing it.",
      },
    ],
    reflectionPrompt:
      "Describe one school task where AI could help you learn, and one where AI would mostly replace your learning.",
    quiz: {
      question:
        "Which use is most aligned with “AI as a tutor” rather than a shortcut?",
      options: [
        "Asking AI to write your final paragraph for submission",
        "Asking AI to quiz you on vocabulary after you read the chapter",
        "Pasting a test question and asking for the letter answer",
        "Asking AI to impersonate you in a graded discussion post",
      ],
      correctIndex: 1,
      explanation:
        "Quizzing you after reading keeps practice and understanding on your side. The other options outsource graded thinking or integrity.",
    },
  },
  {
    slug: "green-yellow-red",
    title: "Green light, yellow light, red light uses",
    summary:
      "A practical framework for spotting low-risk, mixed, and high-risk AI use in school.",
    readingLevel: "High school",
    sections: [
      {
        heading: "Green light (usually supportive)",
        body: "Brainstorming with guardrails, explaining a concept after you read, generating practice questions, outlining your own notes, or giving feedback on writing you already produced.",
      },
      {
        heading: "Yellow light (depends on the assignment)",
        body: "Translation help, summarizing long readings, code suggestions, or math hints. These can be fine or not, depending on teacher rules, assessment type, and whether you verify outputs.",
        example:
          "If your teacher wants evidence you read the novel, summarizing instead of reading is risky.",
      },
      {
        heading: "Red light (often dishonest or harmful)",
        body: "Asking for finished work to submit, test answers, impersonation, hiding AI use when disclosure is required, or anything that evades your school’s policies.",
      },
    ],
    reflectionPrompt:
      "Name one yellow-light use in your life right now. What teacher rule would you check before doing it?",
    quiz: {
      question: "Which situation is most often a red light?",
      options: [
        "Asking AI to suggest three essay topics after you read the prompt",
        "Asking AI for the exact wording to paste as your final thesis",
        "Asking AI to explain a term from the reading in simpler language",
        "Asking AI to make flashcards from your class notes",
      ],
      correctIndex: 1,
      explanation:
        "Asking for finished wording to submit replaces authorship. The other options can support learning when allowed by your teacher.",
    },
  },
  {
    slug: "responsible-prompts",
    title: "How to write a responsible AI prompt",
    summary:
      "Better prompts share context, show your attempt, and ask for learning moves, not completion.",
    readingLevel: "High school",
    sections: [
      {
        heading: "Start with what you tried",
        body: "Mention the page, problem number, or draft section. Share a sentence of your thinking. That helps AI coach you instead of replacing you.",
      },
      {
        heading: "Ask for a learning move",
        body: "Use verbs like explain, quiz, hint, check, compare, or outline next steps. Avoid verbs like write, complete, solve for me, or give answers.",
        example:
          "Instead of “solve #12,” try “I got x = 3 but the answer key says 4. What mistake should I check for?”",
      },
      {
        heading: "Invite verification",
        body: "AI can be wrong. Ask it to show reasoning you can check, and plan to verify facts with class materials or your teacher.",
      },
    ],
    reflectionPrompt:
      "Rewrite this prompt to be more responsible: “Do my homework.” What context would you add?",
    quiz: {
      question: "Which prompt is most responsible for studying?",
      options: [
        "“Give me the essay introduction I can turn in.”",
        "“Here is my intro. What is unclear, and what question should I answer next?”",
        "“Answer every question on my worksheet.”",
        "“Write my lab report in my voice.”",
      ],
      correctIndex: 1,
      explanation:
        "You keep authorship and ask for feedback on your draft, which supports revision and thinking.",
    },
  },
  {
    slug: "ai-can-be-wrong",
    title: "Why AI can be wrong",
    summary:
      "Build habits that protect your grades and your understanding when tools make confident mistakes.",
    readingLevel: "High school",
    sections: [
      {
        heading: "Hallucinations and gaps",
        body: "AI can invent citations, misread prompts, or blend similar ideas. Treat every factual claim as “needs verification” unless you can confirm it in a trusted source.",
      },
      {
        heading: "Bias and oversimplification",
        body: "AI may flatten nuance in history, literature, or ethics. Use it to generate questions for you to investigate, not as a single authority.",
      },
      {
        heading: "What to do",
        body: "Cross-check with your notes, textbook, or teacher. Prefer “show steps” requests in math and science so you can spot errors.",
      },
    ],
    reflectionPrompt:
      "When was a time you almost trusted a wrong answer online? What check would you add next time?",
    quiz: {
      question: "Why should you verify AI outputs for schoolwork?",
      options: [
        "Because teachers dislike AI",
        "Because AI can be confidently incorrect",
        "Because verification is never needed if it sounds smart",
        "Because AI always knows your teacher’s rubric",
      ],
      correctIndex: 1,
      explanation:
        "Confident mistakes are common; verification protects integrity and learning.",
    },
  },
  {
    slug: "unclear-teacher-rules",
    title: "What to do when a teacher’s rules are unclear",
    summary:
      "Use transparency and questions to stay on the right side of expectations.",
    readingLevel: "High school",
    sections: [
      {
        heading: "Teacher rules come first",
        body: "This site gives general guidance. Your teacher’s instructions override everything here when they conflict.",
      },
      {
        heading: "Low-risk ways to clarify",
        body: "Ask whether AI is allowed for brainstorming, feedback, or translation. Ask whether you should cite AI assistance. Offer to show your drafts or notes.",
      },
      {
        heading: "When in doubt, choose the more honest path",
        body: "If you are unsure, pick a use that keeps your own sentences, data, and reasoning visible in the final product.",
      },
    ],
    reflectionPrompt:
      "Write one respectful question you could ask a teacher about AI use on the next big assignment.",
    quiz: {
      question: "If this site and your teacher disagree, who should you follow?",
      options: [
        "Whoever is more convenient",
        "Your teacher",
        "The AI tool",
        "Whoever responds first online",
      ],
      correctIndex: 1,
      explanation:
        "Teachers set expectations for their classroom and assessments.",
    },
  },
];

export function getLesson(slug: string) {
  return lessons.find((l) => l.slug === slug);
}
