import Link from "next/link";
import type { Metadata } from "next";
import { lessons } from "@/lib/lessons";

export const metadata: Metadata = {
  title: "Learn",
  description: "Short modules on responsible AI use for high school.",
};

export default function LearnIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Learn</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Short modules with examples, a reflection prompt, and a quick check for
          understanding. Content is general guidance; your teacher&apos;s rules
          come first.
        </p>
      </header>
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              href={`/learn/${lesson.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-accent/40 hover:shadow-md"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-lg font-semibold text-ink">{lesson.title}</h2>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {lesson.readingLevel}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{lesson.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
