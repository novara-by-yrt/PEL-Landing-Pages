/**
 * reCAPTCHA v2 verification.
 *
 * Contact Form 7 used to do this inside WordPress via the wpcf7-recaptcha
 * plugin, using the same site/secret key pair as a v2 checkbox widget (see
 * components/forms/useFormSubmit.ts for the client-side render/getResponse
 * flow) — not v3. This mirrors that: the endpoint and secret+response
 * exchange are the same for both versions, but v2's response carries no
 * `score` field, so unlike a v3 integration there is no threshold to apply
 * here — a successful verification is just `success: true`.
 *
 * RECAPTCHA_SECRET_KEY is server-only and must never be prefixed NEXT_PUBLIC_.
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export type RecaptchaResult = { ok: true } | { ok: false; reason: string };

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

  let payload: { success?: boolean; "error-codes"?: string[] };

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

  return { ok: true };
}
