"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactSection.module.css";

type Status = { kind: "idle" | "sending" } | { kind: "ok" | "error"; message: string };

function UserIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.7 16.6v2.7a1.8 1.8 0 0 1-2 1.8 17.9 17.9 0 0 1-7.8-2.8 17.6 17.6 0 0 1-5.4-5.4A17.9 17.9 0 0 1 2.7 5.1 1.8 1.8 0 0 1 4.4 3.3h2.7a1.8 1.8 0 0 1 1.8 1.5c.1.8.4 1.7.7 2.4a1.8 1.8 0 0 1-.4 1.9L8 10.4a14.4 14.4 0 0 0 5.4 5.4l1.3-1.2a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.6 2.4.7a1.8 1.8 0 0 1 1.7 1.7z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.7-.8L3 20.5l1.4-4.2A8.2 8.2 0 0 1 3.6 12a8.4 8.4 0 0 1 8.4-8.4h.5A8.4 8.4 0 0 1 21 11.5z" />
    </svg>
  );
}

export default function CallbackForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = String(data.get("message") ?? "").trim();

    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          // The enquiry box is optional here, but /api/contact requires a
          // message — send a stand-in rather than letting the request 400.
          message: message || "Call back requested via the home page form.",
          marketingOptIn: data.get("marketingOptIn") === "on",
          source: "Home page — request a call back",
        }),
      });

      const body = await response.json();
      if (!response.ok) throw new Error(body?.error ?? "Something went wrong.");

      setStatus({
        kind: "ok",
        message: body?.message ?? "Thank you! We will be in touch shortly.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send that. Please try again, or call the clinic.",
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Request a call back</h3>

      {/* The design labels fields with placeholders only. Sighted users get
          that; the visually hidden labels below give everyone else the same
          information, and keep each control properly named. */}
      <form onSubmit={handleSubmit} noValidate={false}>
        <div className={styles.field}>
          <span className={styles.fieldIcon}>
            <UserIcon />
          </span>
          <label className="sr-only" htmlFor="cb-name">
            Full name (required)
          </label>
          <input
            id="cb-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full Name *"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldIcon}>
            <MailIcon />
          </span>
          <label className="sr-only" htmlFor="cb-email">
            Email address (required)
          </label>
          <input
            id="cb-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email Address *"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldIcon}>
            <PhoneIcon />
          </span>
          <label className="sr-only" htmlFor="cb-phone">
            Phone number (required)
          </label>
          <input
            id="cb-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Phone Number *"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <span className={`${styles.fieldIcon} ${styles.fieldIconArea}`}>
            <MessageIcon />
          </span>
          <label className="sr-only" htmlFor="cb-message">
            Tell us about your enquiry (optional)
          </label>
          <textarea
            id="cb-message"
            name="message"
            rows={5}
            placeholder="Tell us about your enquiry (optional)"
            className={styles.textarea}
          />
        </div>

        <label className={styles.consent} htmlFor="cb-consent">
          <input
            id="cb-consent"
            name="marketingOptIn"
            type="checkbox"
            className={styles.checkbox}
          />
          <span>
            Yes, I would like to receive updates, offers and tips by email, SMS or phone.
          </span>
        </label>

        {status.kind === "ok" || status.kind === "error" ? (
          <p
            role="status"
            className={`${styles.status} ${
              status.kind === "ok" ? styles.statusOk : styles.statusError
            }`}
          >
            {status.message}
          </p>
        ) : null}

        <button
          type="submit"
          className={`tp-btn tp-btn-primary tp-btn-lg ${styles.submit}`}
          disabled={sending}
        >
          {sending ? "Sending…" : "Request a Call Back"}
          <span className="tp-btn-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
}
