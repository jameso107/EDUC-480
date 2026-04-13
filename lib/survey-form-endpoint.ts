/** Default Formspree form for post-survey submissions (override with env if needed). */
export const DEFAULT_FORMSPREE_SURVEY_URL =
  "https://formspree.io/f/meevqvzy" as const;

/**
 * Formspree “contact form” endpoint: https://formspree.io/f/{id}
 * The id is the random segment after /f/ in the form URL.
 */
export function formspreeUrl(formId: string) {
  const id = formId.trim();
  return `https://formspree.io/f/${encodeURIComponent(id)}`;
}

/** Allowlist to reduce SSRF risk when forwarding submissions from the server. */
export function isAllowedSurveyFormUrl(url: string): boolean {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return false;
  }
  if (u.protocol !== "https:") return false;
  const host = u.hostname.toLowerCase();
  if (host === "formspree.io") return u.pathname.startsWith("/f/");
  if (host.endsWith(".formspree.io")) return true;
  return false;
}

export function parseFormspreeFormId(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  const t = raw.trim();
  if (/^[a-zA-Z0-9_-]+$/.test(t)) return t;
  try {
    const u = new URL(t);
    if (!isAllowedSurveyFormUrl(u.toString())) return null;
    const m = u.pathname.match(/^\/f\/([^/]+)\/?$/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}
