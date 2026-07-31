"use client";

import { useState } from "react";
import Link from "next/link";

const TREATMENTS = [
  "Blepharoplasty (Upper Eyelid Surgery)",
  "Lower Blepharoplasty (Eye Bag Removal)",
  "Ptosis Surgery (Droopy Eyelid Correction)",
  "Tear Trough Fillers",
  "Polynucleotides",
  "Morpheus8",
  "Endolift",
  "Profhilo / Skin Boosters",
  "Microneedling",
  "Xanthelasma Removal",
  "Other / Not Sure",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", treatment: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, hsl(199 90% 22%), hsl(199 90% 32%))",
          color: "#fff",
          padding: "5rem 0 4rem",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "hsl(38 92% 70%)",
              marginBottom: "1.25rem",
              background: "hsl(0 0% 100% / 0.1)",
              padding: "0.375rem 1rem",
              borderRadius: "9999px",
            }}
          >
            Get In Touch
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Book a Consultation
          </h1>
          <p
            style={{
              color: "hsl(0 0% 100% / 0.8)",
              fontSize: "1.125rem",
              maxWidth: "48ch",
              margin: "0 auto",
            }}
          >
            Fill in the form below and our team will get back to you within 24 hours to
            discuss your treatment options.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <section
        className="section container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* ── Left: Info ───────────────────────────────────────────── */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "1.75rem",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            Why Choose Skynology?
          </h2>

          {[
            {
              icon: "🏥",
              title: "CQC Regulated",
              body: "All treatments are performed in a fully CQC-regulated environment for your safety.",
            },
            {
              icon: "👁️",
              title: "Specialist Surgeons",
              body: "Our surgeons are fellowship-trained oculoplastic specialists with 20+ years of experience.",
            },
            {
              icon: "⭐",
              title: "5-Star Rated",
              body: "Consistently rated 5 stars by our patients across all major review platforms.",
            },
            {
              icon: "🎯",
              title: "Personalised Approach",
              body: "Every treatment plan is tailored to your unique anatomy, goals, and lifestyle.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.5rem",
                padding: "1.25rem",
                background: "var(--clr-bg-subtle)",
                borderRadius: "12px",
                border: "1px solid var(--clr-border)",
              }}
            >
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--clr-text-muted)", lineHeight: 1.6 }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "hsl(199 90% 32% / 0.06)",
              borderRadius: "12px",
              border: "1px solid hsl(199 90% 32% / 0.15)",
            }}
          >
            <p
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--clr-primary)",
                marginBottom: "0.75rem",
              }}
            >
              Contact Details
            </p>
            <p style={{ fontSize: "0.9375rem", marginBottom: "0.5rem" }}>
              📍 London, United Kingdom
            </p>
            <p style={{ fontSize: "0.9375rem", marginBottom: "0.5rem" }}>
              📧{" "}
              <a
                href="mailto:perfecteyesltd@gmail.com"
                style={{ color: "var(--clr-primary)" }}
              >
                perfecteyesltd@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* ── Right: Form ──────────────────────────────────────────── */}
        <div
          style={{
            background: "var(--clr-bg-card)",
            border: "1px solid var(--clr-border)",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                Message Sent!
              </h2>
              <p style={{ color: "var(--clr-text-muted)", marginBottom: "2rem" }}>
                Thank you for getting in touch. We will respond within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn btn-outline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate id="contact-form">
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.5rem",
                  marginBottom: "1.75rem",
                }}
              >
                Send Us a Message
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label htmlFor="contact-name" className="form-label">
                    Full Name <span aria-hidden="true" style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span aria-hidden="true" style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label htmlFor="contact-phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="+44 7700 000000"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-treatment" className="form-label">
                    Treatment of Interest
                  </label>
                  <select
                    id="contact-treatment"
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select a treatment…</option>
                    {TREATMENTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="contact-message" className="form-label">
                  Your Message <span aria-hidden="true" style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your concerns and what you would like to achieve…"
                  className="form-input"
                  style={{ resize: "vertical" }}
                />
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  style={{
                    background: "hsl(0 80% 96%)",
                    border: "1px solid hsl(0 80% 80%)",
                    color: "hsl(0 60% 40%)",
                    borderRadius: "8px",
                    padding: "0.75rem 1rem",
                    marginBottom: "1rem",
                    fontSize: "0.875rem",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                id="contact-submit"
                disabled={status === "sending"}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "1rem" }}
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>

              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--clr-text-muted)",
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                By submitting this form you agree to our{" "}
                <Link href="/privacy-notice" style={{ color: "var(--clr-primary)" }}>
                  Privacy Notice
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Mobile responsiveness fix */}
      <style>{`
        @media (max-width: 768px) {
          section.section.container[style] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
