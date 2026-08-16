/**
 * Contact Form 7 integration.
 *
 * Every form on the site is defined in WordPress (Contact Form 7 6.1.6) and
 * submitted through CF7's REST API, so the field names, validation rules and
 * mail templates all stay owned by the CF7 admin screens rather than being
 * duplicated here.
 *
 * Submissions are proxied through /api/cf7 rather than posted from the browser
 * directly: that keeps the WordPress origin out of the client bundle and avoids
 * needing CORS headers on WordPress.
 */

/** WordPress origin. Server-side only — never inlined into the client bundle. */
export const WP_BASE_URL =
  process.env.WP_BASE_URL?.replace(/\/$/, "") || "http://localhost/skynology";

/**
 * The six published CF7 forms, keyed by a stable slug the client can send.
 * Numeric IDs are the wp_posts IDs — CF7's REST routes take the numeric ID,
 * not the hash used in the `[contact-form-7 id="…"]` shortcodes.
 */
export const CF7_FORMS = {
  callback: { id: 20790, title: "Request A Call Back", recaptcha: true },
  blogSidebar: { id: 20784, title: "Website Form (Blog Sidebar)", recaptcha: true },
  appointment: { id: 20789, title: "Book an Appointment", recaptcha: false },
  quiz: { id: 20786, title: "Blepharoplasty Candidacy Quiz", recaptcha: false },
  popup: { id: 20788, title: "On Load Popup Form", recaptcha: true },
  general: { id: 20783, title: "Contact form 1", recaptcha: false },
} as const;

export type Cf7FormKey = keyof typeof CF7_FORMS;

export function isCf7FormKey(value: unknown): value is Cf7FormKey {
  return typeof value === "string" && value in CF7_FORMS;
}

/** A single field-level error as returned by CF7. */
export type Cf7InvalidField = {
  field: string;
  message: string;
  idref: string | null;
  error_id: string;
};

/**
 * CF7's feedback payload. `status` is `mail_sent` on success; the failure modes
 * we care about are `validation_failed` (field errors) and `spam` (reCAPTCHA
 * scored below the 0.5 threshold, or the token was missing).
 */
export type Cf7Response = {
  contact_form_id: number;
  status:
    | "mail_sent"
    | "mail_failed"
    | "validation_failed"
    | "acceptance_missing"
    | "spam"
    | "aborted"
    | "unaccepted_terms";
  message: string;
  invalid_fields?: Cf7InvalidField[];
  posted_data_hash?: string;
  into?: string;
};

/**
 * Posts a submission to CF7 and returns its verbatim feedback payload.
 *
 * CF7 only accepts multipart bodies, and it namespaces the per-field error IDs
 * it hands back by `_wpcf7_unit_tag`, so we send one built from the form ID.
 */
export async function submitToCf7(
  key: Cf7FormKey,
  fields: FormData,
  clientIp?: string | null
): Promise<Cf7Response> {
  const { id } = CF7_FORMS[key];

  fields.set("_wpcf7_unit_tag", `wpcf7-f${id}-o1`);

  const headers: Record<string, string> = {};
  // CF7 logs the submitter's IP and passes it to reCAPTCHA as `remoteip`.
  // Without this it would record the Next.js server for every submission.
  if (clientIp) headers["X-Forwarded-For"] = clientIp;

  const res = await fetch(
    `${WP_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`,
    { method: "POST", body: fields, headers, cache: "no-store" }
  );

  if (!res.ok && res.status !== 400) {
    throw new Error(`Contact Form 7 returned HTTP ${res.status}`);
  }

  return (await res.json()) as Cf7Response;
}
