import { FORMS, type FormDefinition, type FormKey } from "./definitions";

/**
 * Notification email rendering and delivery.
 *
 * Delivery goes through Resend's REST API via `fetch` — no SDK dependency, and
 * swapping providers means changing only `send()` below.
 *
 * The body is plain text in `Label: value` lines, matching the format the
 * previous Contact Form 7 templates produced. Boxly parses these messages, so
 * changing the layout risks breaking that intake — keep it stable.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Comma-separated in env; these defaults are the live destinations. */
const TO = (
  process.env.FORM_NOTIFICATION_TO ||
  "019f8f44-b8a7-4775-9e74-4e5d45ac8980@webform.boxly.ai,enquiries@perfecteyesltd.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const FROM =
  process.env.FORM_NOTIFICATION_FROM || "Perfect Eyes Ltd <website@perfecteyesltd.com>";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

/** Strips CR/LF so a submitted name cannot inject extra mail headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export type RenderedEmail = { subject: string; text: string; replyTo?: string };

export function render(
  key: FormKey,
  values: Record<string, string[]>,
  meta: { page?: string } = {}
): RenderedEmail {
  // Widened deliberately: `satisfies` narrows each entry to its own literal
  // type, which drops the optional `intro` from forms that don't set one.
  const definition: FormDefinition = FORMS[key];
  const get = (name: string) => values[name]?.join(", ") ?? "";

  const lines: string[] = [];
  if (definition.intro) lines.push(definition.intro, "");

  for (const field of definition.fields) {
    const value = values[field.name] ?? [];
    if (field.kind === "consent") {
      lines.push(`${field.label}: ${value.length > 0 ? "Yes" : "No"}`);
      continue;
    }
    if (value.length === 0) continue;
    if (field.kind === "textarea") {
      lines.push(`${field.label}:`, value.join("\n"));
      continue;
    }
    lines.push(`${field.label}: ${value.join(", ")}`);
  }

  lines.push(
    "",
    "--",
    `Submitted via the ${definition.title} form on ${SITE_URL}`,
    meta.page ? `Page: ${meta.page}` : "",
    `Received: ${new Date().toISOString()}`
  );

  const email = values["your-email"]?.[0];

  return {
    subject: headerSafe(definition.subject(get)),
    text: lines.filter((l) => l !== undefined).join("\n"),
    replyTo: email,
  };
}

export type SendResult = { ok: true } | { ok: false; reason: string };

export async function send(email: RenderedEmail): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not set." };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        subject: email.subject,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text();
      return { ok: false, reason: `Resend returned ${res.status}: ${detail.slice(0, 300)}` };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Unknown transport error.",
    };
  }
}
