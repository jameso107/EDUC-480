import { ButtonLink } from "@/components/ButtonLink";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Student resource
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Learn to use AI without losing your learning.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Practice ethical, responsible AI use for school with guided examples,
          interactive scenarios, and a chatbot built to help you think, not
          cheat.
        </p>
        <p className="mt-4 max-w-2xl text-slate-700">
          AI can be a great study partner, but only when you stay in charge of
          the thinking.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/learn">Start Learning</ButtonLink>
          <ButtonLink href="/practice/scenarios" variant="secondary">
            Try a Scenario
          </ButtonLink>
          <ButtonLink href="/chat" variant="secondary">
            Chat Responsibly
          </ButtonLink>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Digital citizenship",
            body: "Green, yellow, and red lights for real school situations—not vague rules.",
          },
          {
            title: "Study skills",
            body: "Prompt practice that nudges you toward hints, questions, and revision.",
          },
          {
            title: "Integrity guardrails",
            body: "The coach refuses outsourcing and redirects you to learning moves.",
          },
        ].map((c) => (
          <article
            key={c.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-base font-semibold text-ink">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{c.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-ink">What you will practice</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
          <li>Telling support apart from cheating</li>
          <li>Rewriting risky prompts into learning-focused ones</li>
          <li>Checking a planned AI use before you try it</li>
          <li>Talking with a coach that models ethical habits</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-ink">After you finish</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Help us understand how your AI literacy and opinions evolved—complete the
          short post-survey when you are done with the playbook.
        </p>
        <div className="mt-4">
          <ButtonLink href="/survey" variant="secondary">
            Post-survey
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
