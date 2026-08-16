/**
 * reCAPTCHA v3 verification.
 *
 * Contact Form 7 used to do this inside WordPress; now it happens here. The
 * 0.5 score threshold matches the one CF7 applied, so spam behaviour is
 * unchanged from the previous setup.
 *
 * RECAPTCHA_SECRET_KEY is server-only and must never be prefixed NEXT_PUBLIC_.
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const THRESHOLD = 0.5;

export type RecaptchaResult =
  | { ok: true; score: number }
  | { ok: false; reason: string };

export async function verifyRecaptcha(
  token: string | null,
  clientIp?: string | null
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    // Fail closed: an unconfigured secret must not silently disable spam
    // protection on a live site.
    return { ok: false, reason: "reCAPTCHA is not configured on the server." };
  }

  if (!token) {
    return { ok: false, reason: "reCAPTCHA response token is empty." };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (clientIp) body.set("remoteip", clientIp);

  let payload: { success?: boolean; score?: number; "error-codes"?: string[] };

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    payload = await res.json();
  } catch {
    return { ok: false, reason: "Could not reach the reCAPTCHA service." };
  }

  if (!payload.success) {
    return {
      ok: false,
      reason: `reCAPTCHA rejected the token (${payload["error-codes"]?.join(", ") || "unknown"}).`,
    };
  }

  const score = payload.score ?? 0;
  if (score < THRESHOLD) {
    return { ok: false, reason: `reCAPTCHA score ${score} is below ${THRESHOLD}.` };
  }

  return { ok: true, score };
}
