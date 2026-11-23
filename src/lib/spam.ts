// Lightweight, dependency-free spam checks shared by the public forms
// (contact and topic suggestions). Rendered fields live in
// `src/components/spam-trap.tsx`.

/** Hidden input that humans never see; bots tend to fill every field. */
export const HONEYPOT_FIELD = "website";
/** Hidden input set by the client (in ms since epoch) when the form mounts. */
export const STARTED_AT_FIELD = "startedAt";

/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_MS = 3_000;

/** Per-email rate limit for public submissions. */
export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/** Messages with more links than this are rejected. */
export const MAX_LINKS = 3;

/**
 * Returns true when the submission looks automated: the honeypot was filled,
 * the client-side timestamp is missing or malformed (the form needs JS), or
 * the form was submitted implausibly fast.
 */
export function isLikelyBot(formData: FormData, now = Date.now()): boolean {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;

  const elapsed = now - startedAt;
  // A timestamp in the future means it was forged.
  if (elapsed < MIN_FILL_MS) return true;

  return false;
}

export function countLinks(text: string): number {
  return text.match(/https?:\/\/|www\./gi)?.length ?? 0;
}

export function rateLimitSince(now = Date.now()): Date {
  return new Date(now - RATE_LIMIT_WINDOW_MS);
}
