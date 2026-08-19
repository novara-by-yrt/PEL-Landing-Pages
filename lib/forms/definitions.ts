/**
 * Form definitions.
 *
 * These six forms began life as Contact Form 7 entries in WordPress. The field
 * names are kept verbatim from those definitions so the notification emails
 * keep the exact shape downstream systems already parse — but nothing here
 * talks to WordPress. Validation, spam checking and delivery all happen in
 * this app.
 *
 * Adding a field means adding it here AND to the matching component in
 * components/forms/; this file is what the server validates and emails.
 */

export type FieldSpec = {
  /** Posted field name. Multi-value fields are posted as `name[]`. */
  name: string;
  /** Label used in the notification email. */
  label: string;
  required?: boolean;
  kind?: "text" | "email" | "tel" | "textarea" | "consent";
  /** Checkbox groups that can hold several values. */
  multiple?: boolean;
};

export type FormDefinition = {
  title: string;
  /** Whether the client attaches a reCAPTCHA v3 token for this form. */
  recaptcha: boolean;
  /** Builds the notification subject line. */
  subject: (get: (name: string) => string) => string;
  /** Optional opening line in the email body. */
  intro?: string;
  fields: FieldSpec[];
  /** Shown as the success-state heading after a real submission. */
  successHeading: string;
  /** Shown as the success-state body text after a real submission — names
   *  what happens next for this specific form rather than a generic
   *  "message sent", since a caller checking availability and a visitor
   *  taking a self-assessment quiz expect different next steps. */
  successMessage: string;
};

const NAME: FieldSpec = { name: "your-name", label: "Name", required: true };
const EMAIL: FieldSpec = { name: "your-email", label: "Email", required: true, kind: "email" };
const PHONE: FieldSpec = { name: "your-phone", label: "Phone", required: true, kind: "tel" };
const MESSAGE: FieldSpec = { name: "your-message", label: "Message", kind: "textarea" };

export const FORMS = {
  callback: {
    title: "Request A Call Back",
    recaptcha: true,
    subject: (get) => `Request A Call Back from ${get("your-name")}`,
    intro: "A new call back request was submitted on the website.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "your-phone-full", label: "Phone (full)" },
      MESSAGE,
      { name: "consent", label: "Marketing consent", kind: "consent" },
    ],
    successHeading: "Call Back Requested",
    successMessage: "Thank you for requesting a call back. A member of our team will call you shortly.",
  },

  blogSidebar: {
    title: "Website Form (Blog Sidebar)",
    recaptcha: true,
    subject: (get) => `New blog form enquiry from ${get("your-name")}`,
    intro: "Submitted via the blog sidebar form.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "ideal-time", label: "Ideal time to contact", required: true },
      { name: "contact-method", label: "Preferred contact method", required: true },
      { name: "enquiring-about", label: "Enquiring about", required: true },
      { name: "consent-checkbox", label: "Marketing consent", kind: "consent" },
    ],
    successHeading: "Enquiry Received",
    successMessage: "Thank you for reaching out. Our team will be in touch about your enquiry shortly.",
  },

  appointment: {
    title: "Book an Appointment",
    recaptcha: false,
    subject: (get) => `Website Enquiry: ${get("your-name")}`,
    intro: "A new appointment enquiry was submitted on the website.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "preferred-time", label: "Preferred time", required: true },
      { name: "enquiry-type", label: "Enquiry type", required: true },
      { name: "contact-method", label: "Preferred contact method", required: true, multiple: true },
      MESSAGE,
      { name: "consent-checkbox", label: "Marketing consent", kind: "consent" },
    ],
    successHeading: "Appointment Request Received",
    successMessage:
      "Thank you for your appointment enquiry. Our team will contact you within 24-48 hours to confirm your consultation.",
  },

  quiz: {
    title: "Blepharoplasty Candidacy Quiz",
    recaptcha: false,
    subject: (get) => `New Blepharoplasty Quiz lead: ${get("your-name")}`,
    intro: "A new Blepharoplasty candidacy quiz was submitted on the website.",
    fields: [
      NAME,
      PHONE,
      EMAIL,
      { name: "your-location", label: "Location", required: true },
      { name: "existing-customer", label: "Existing customer", required: true },
      { name: "prior-surgery", label: "Prior eyelid/eyebrow lift surgery", required: true },
      { name: "recent-filler", label: "Filler around eyes in last 2 years", required: true },
      { name: "considering-6-months", label: "Considering procedure within 6 months", required: true },
      { name: "budget-5000", label: "£5,000 within budget", required: true },
      { name: "reasons", label: "Reasons for wanting Blepharoplasty", multiple: true },
      { name: "medications", label: "Medications", multiple: true },
      { name: "symptoms", label: "Symptoms", required: true },
    ],
    successHeading: "Quiz Submitted",
    successMessage:
      "Thank you for completing the Blepharoplasty Candidacy Quiz. Our team will review your answers and be in touch to discuss your results.",
  },

  popup: {
    title: "On Load Popup Form",
    recaptcha: true,
    subject: (get) => `New on-load popup enquiry from ${get("your-name")}`,
    intro: "Submitted via the on-load popup form.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      MESSAGE,
      { name: "consent-checkbox", label: "Marketing consent", kind: "consent" },
    ],
    successHeading: "Enquiry Received",
    successMessage: "Thank you for your enquiry. A member of our team will be in touch shortly.",
  },

  general: {
    title: "General Contact Form",
    recaptcha: false,
    subject: (get) => `Website enquiry: ${get("your-subject")}`,
    fields: [
      NAME,
      EMAIL,
      { name: "your-subject", label: "Subject", required: true },
      MESSAGE,
    ],
    successHeading: "Message Sent",
    successMessage: "Thank you for contacting us. We'll respond to your message shortly.",
  },
} satisfies Record<string, FormDefinition>;

export type FormKey = keyof typeof FORMS;

export function isFormKey(value: unknown): value is FormKey {
  return typeof value === "string" && value in FORMS;
}
