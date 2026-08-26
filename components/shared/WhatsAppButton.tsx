"use client";

import { trackWhatsAppChat } from "@/lib/analytics/track";
import { DEFAULT_WHATSAPP_MESSAGE, whatsAppHref, whatsAppNumber } from "@/lib/whatsapp";
import styles from "./WhatsAppButton.module.css";

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.02 8.02 0 0 1-1.23-4.28c0-4.46 3.63-8.09 8.1-8.09z" />
    </svg>
  );
}

/**
 * Floating WhatsApp button — a link, and nothing more.
 *
 * One tap opens a chat with the clinic, pre-filled with a greeting. There is
 * deliberately no form in front of it: this is the immediate channel, and
 * anything asked before the first message is friction on the one route a
 * visitor chose because it had none.
 *
 * The trade-off is worth stating where the next person will find it. Unlike
 * the six forms in components/forms, nothing here reaches Boxly — a wa.me tap
 * leaves no record on the clinic's side at all, so a WhatsApp enquiry exists
 * only in whichever phone answers it, and the CRM never learns of it. The
 * dataLayer event below is the only trace this site keeps, and it counts
 * departures, not conversations.
 *
 * It is a plain <a>, so it works without JavaScript and is opened by the
 * browser rather than by script — nothing can sit between the tap and
 * WhatsApp. Renders nothing while NEXT_PUBLIC_WHATSAPP_NUMBER is unset; see
 * lib/whatsapp.ts for why that is the safe default.
 */
export default function WhatsAppButton() {
  const number = whatsAppNumber();
  if (!number) return null;

  return (
    <a
      className={styles.fab}
      href={whatsAppHref(number, DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={trackWhatsAppChat}
    >
      <WhatsAppIcon />
    </a>
  );
}
