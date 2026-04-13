import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLesson, lessons } from "@/lib/lessons";
import { LessonClient } from "./ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson" };
  return { title: lesson.title, description: lesson.summary };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← All modules
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
          {lesson.title}
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">{lesson.summary}</p>
      </div>

      <article className="space-y-8">
        {lesson.sections.map((s) => (
          <section key={s.heading} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">{s.heading}</h2>
            <p className="mt-3 text-slate-700">{s.body}</p>
            {s.example ? (
              <figure className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-800">
                <figcaption className="font-medium text-slate-600">Example</figcaption>
                <p className="mt-1">{s.example}</p>
              </figure>
            ) : null}
          </section>
        ))}
      </article>

      <LessonClient lessonSlug={lesson.slug} reflectionPrompt={lesson.reflectionPrompt} quiz={lesson.quiz} />
    </div>
  );
}
