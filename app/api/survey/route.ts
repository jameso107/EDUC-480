import { buildSurveyEmailText } from "@/lib/survey-email";
import {
  DEFAULT_FORMSPREE_SURVEY_URL,
  formspreeUrl,
  isAllowedSurveyFormUrl,
  parseFormspreeFormId,
} from "@/lib/survey-form-endpoint";
import type { SurveyPayload } from "@/lib/survey-payload";
import { isLikert } from "@/lib/survey-payload";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MIN_TEXT = 10;
const MAX_TEXT = 8000;

function parsePayload(body: unknown): SurveyPayload | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;

  if (typeof o.company === "string" && o.company.trim().length > 0) {
    return null;
  }

  const a = o.clarityResponsibleVsProblematic;
  const b = o.confidenceEthicalUse;
  const c = o.promptLearningFocus;
  if (!isLikert(a) || !isLikert(b) || !isLikert(c)) return null;

  const meaning = typeof o.responsibleAiMeaning === "string" ? o.responsibleAiMeaning.trim() : "";
  const habit = typeof o.habitGoingForward === "string" ? o.habitGoingForward.trim() : "";
  if (meaning.length < MIN_TEXT || habit.length < MIN_TEXT) return null;
  if (meaning.length > MAX_TEXT || habit.length > MAX_TEXT) return null;

  const schools =
    typeof o.schoolsApproach === "string" ? o.schoolsApproach.trim().slice(0, MAX_TEXT) : "";
  const extra =
    typeof o.additionalComments === "string"
      ? o.additionalComments.trim().slice(0, MAX_TEXT)
      : "";

  return {
    clarityResponsibleVsProblematic: a,
    confidenceEthicalUse: b,
    promptLearningFocus: c,
    responsibleAiMeaning: meaning,
    habitGoingForward: habit,
    schoolsApproach: schools || undefined,
    additionalComments: extra || undefined,
  };
}

function resolveFormspreePostUrl(): { url: string } | { error: string } {
  const custom = process.env.SURVEY_FORM_ACTION?.trim();
  if (custom) {
    if (!isAllowedSurveyFormUrl(custom)) {
      return {
        error:
          "SURVEY_FORM_ACTION must be a https://formspree.io/f/... URL (or omit it and set SURVEY_FORMSPREE_ID).",
      };
    }
    return { url: custom };
  }
  const id = parseFormspreeFormId(process.env.SURVEY_FORMSPREE_ID);
  if (id) {
    return { url: formspreeUrl(id) };
  }
  return { url: DEFAULT_FORMSPREE_SURVEY_URL };
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const o = json && typeof json === "object" ? (json as Record<string, unknown>) : {};
  if (typeof o.company === "string" && o.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const payload = parsePayload(json);
  if (!payload) {
    return NextResponse.json(
      { error: "Missing or invalid answers. Check required fields and length limits." },
      { status: 400 },
    );
  }

  const endpoint = resolveFormspreePostUrl();
  if ("error" in endpoint) {
    return NextResponse.json({ error: endpoint.error }, { status: 503 });
  }

  const submittedAt = new Date().toISOString();
  const subject = `[Playbook Post-Survey] ${submittedAt.slice(0, 10)}`;
  const message = buildSurveyEmailText(payload, { submittedAt });

  const res = await fetch(endpoint.url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      message,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[alp-survey]", res.status, detail.slice(0, 500));
    return NextResponse.json(
      {
        error:
          "The contact form could not accept this submission right now. Try again in a moment.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
