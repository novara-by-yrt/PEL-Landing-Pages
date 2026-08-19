import nodemailer from "nodemailer";
import { FORMS, type FormDefinition, type FormKey } from "./definitions";

/**
 * Notification email rendering and delivery.
 *
 * Delivery goes out over authenticated SMTP via Mailgun — the client's
 * Microsoft 365 tenant blocks direct SMTP AUTH from a public form
 * (blacklisting-risk policy their IT provider applies org-wide), so this
 * points at Mailgun instead, using credentials supplied directly by the
 * client (see .env.local). Swapping providers means changing only `send()`
 * below.
 *
 * The body is plain text in `Label: value` lines, matching the format the
 * previous Contact Form 7 templates produced. Boxly parses these messages, so
 * changing the layout risks breaking that intake — keep it stable.
 */

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

/** Built lazily (not at module load) so a missing env var surfaces as a
 *  normal SendResult failure instead of crashing the route on import. */
function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    // 465 is implicit TLS; 587 and 25 negotiate TLS via STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function send(email: RenderedEmail): Promise<SendResult> {
  const transporter = buildTransporter();

  if (!transporter) {
    return { ok: false, reason: "SMTP_HOST, SMTP_USER, or SMTP_PASSWORD is not set." };
  }

  try {
    await transporter.sendMail({
      from: FROM,
      to: TO,
      subject: email.subject,
      text: email.text,
      ...(email.replyTo ? { replyTo: email.replyTo } : {}),
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Unknown transport error.",
    };
  }
}
