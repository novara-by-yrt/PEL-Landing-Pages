import { FORMS, type FormKey } from "./definitions";

/**
 * Server-side validation. This replaces what Contact Form 7 used to do in
 * WordPress, so it has to be authoritative — the browser's `required`
 * attributes are a convenience, not a guarantee.
 *
 * The messages deliberately match CF7's defaults so the wording users see is
 * unchanged from the previous setup.
 */

const MESSAGES = {
  required: "Please fill out this field.",
  email: "Please enter an email address.",
  tel: "Please enter a telephone number.",
  tooLong: "This answer is too long.",
};

/** Guards against someone posting a megabyte into a text field. */
const MAX_LENGTH = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Deliberately permissive: international formats vary wildly and a strict
// pattern rejects more real numbers than it catches fake ones.
const TEL_RE = /^[\d\s+().\-/]{6,}$/;

export type Validated = {
  /** Every field's submitted values, keyed by field name. */
  values: Record<string, string[]>;
  /** Field name → message. Empty when the submission is valid. */
  errors: Record<string, string>;
};

export function validate(key: FormKey, data: FormData): Validated {
  const definition = FORMS[key];
  const values: Record<string, string[]> = {};
  const errors: Record<string, string> = {};

  for (const field of definition.fields) {
    // Multi-value fields post as `name[]`; read both so a single-value
    // submission of a multiple field still works.
    const raw = [
      ...data.getAll(field.name),
      ...data.getAll(`${field.name}[]`),
    ]
      .map((v) => (typeof v === "string" ? v.trim() : ""))
      .filter((v) => v !== "");

    values[field.name] = raw;

    if (field.required && raw.length === 0) {
      errors[field.name] = MESSAGES.required;
      continue;
    }

    if (raw.some((v) => v.length > MAX_LENGTH)) {
      errors[field.name] = MESSAGES.tooLong;
      continue;
    }

    if (raw.length === 0) continue;

    if (field.kind === "email" && !EMAIL_RE.test(raw[0])) {
      errors[field.name] = MESSAGES.email;
    }

    if (field.kind === "tel" && !TEL_RE.test(raw[0])) {
      errors[field.name] = MESSAGES.tel;
    }
  }

  return { values, errors };
}
