/**
 * The clinic's WhatsApp number, and the link that opens a chat with it.
 *
 * Deliberately not in lib/clinic.ts with the other contact details: those are
 * published facts about the clinic that belong in the repository, whereas the
 * number WhatsApp answers on is deployment configuration — it can differ
 * between staging and production, and it is the one contact detail where
 * getting it wrong sends a patient's medical enquiry to a stranger. It comes
 * from NEXT_PUBLIC_WHATSAPP_NUMBER, and the button does not render at all
 * when that is unset, so the failure mode of forgetting to configure it is a
 * missing button rather than a misdirected conversation.
 */

/** The clinic's own greeting, used when the visitor adds nothing of their own. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello, I have a question regarding treatment at The Perfect Eyes Clinic.";

/**
 * wa.me wants digits only — no `+`, spaces or punctuation — and rejects
 * anything else with an unhelpful "phone number shared via url is invalid"
 * page. Accepting the readable forms someone will actually paste into an env
 * file (`+44 7476 544881`, `+44 (0)7476 544881`) and normalising here is the
 * difference between the button working and failing silently in production.
 *
 * Returns null for anything that is not a plausible international number, so
 * a typo hides the button rather than publishing a broken link. The 8–15
 * digit range is E.164's, minus the shortest country codes.
 */
export function normaliseWhatsAppNumber(raw: string | undefined): string | null {
  if (!raw) return null;

  /* A UK number written with the trunk "0" — "+44 (0)7476 …" — is the common
     paste, and the zero is not part of the international number. Only ever
     stripped when it sits in parentheses, which is what marks it as the
     trunk prefix rather than a digit of the number itself. */
  const digits = raw.replace(/\(0\)/g, "").replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

/** The configured number, or null when the site has none. */
export function whatsAppNumber(): string | null {
  // Referenced literally: Next inlines NEXT_PUBLIC_* into the client bundle by
  // static analysis, so a computed key would arrive undefined in the browser.
  return normaliseWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}

/** A wa.me link that opens a chat with the given first message. */
export function whatsAppHref(number: string, message: string): string {
  const text = message.trim() || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
