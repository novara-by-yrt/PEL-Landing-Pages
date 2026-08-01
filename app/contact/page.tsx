"use client";

import { useState } from "react";
import Link from "next/link";
import { TreatmentStyles } from "@/components/treatment/TreatmentStyles";
import { TpIcon } from "@/components/treatment/TpIcon";
import { PageHero } from "@/components/treatment/PageHero";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

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

const WHY_CHOOSE_US = [
  { icon: "shield", title: "CQC Regulated", body: "All treatments are performed in a fully CQC-regulated environment for your safety." },
  { icon: "eye", title: "Specialist Surgeons", body: "Our surgeons are fellowship-trained oculoplastic specialists with 20+ years of experience." },
  { icon: "star", title: "5-Star Rated", body: "Consistently rated 5 stars by our patients across all major review platforms." },
  { icon: "sparkle", title: "Personalised Approach", body: "Every treatment plan is tailored to your unique anatomy, goals, and lifestyle." },
] as const;

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
      <TreatmentStyles />
      <div className="tp">
        <style>{`
          .contact-grid { max-width: 1200px; margin: 0 auto; padding: clamp(3rem, 6vw, 4.5rem) 1.5rem 5rem; display: grid; grid-template-columns: 1fr 1.5fr; gap: 3.5rem; align-items: start; }
          @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; } }
          .contact-why h2 { font-family: var(--tp-display); font-weight: 600; font-size: 1.6rem; color: var(--tp-ink); margin-bottom: 1.5rem; }
          .contact-why-item { display: flex; gap: 1rem; margin-bottom: 1.25rem; padding: 1.1rem 1.25rem; background: var(--tp-fog); border-radius: var(--tp-radius-md); border: 1px solid var(--tp-line); }
          .contact-why-icon { flex-shrink: 0; width: 38px; height: 38px; border-radius: 10px; background: var(--tp-lavender-100); color: var(--tp-indigo-700); display: flex; align-items: center; justify-content: center; }
          .contact-why-item h3 { font-family: var(--tp-body); font-size: 0.9375rem; font-weight: 700; color: var(--tp-ink); margin-bottom: 0.25rem; }
          .contact-why-item p { font-size: 0.875rem; color: var(--tp-slate); line-height: 1.6; margin: 0; }
          .contact-details { margin-top: 1.5rem; padding: 1.5rem; background: var(--tp-lavender-050); border-radius: var(--tp-radius-md); border: 1px solid var(--tp-line); }
          .contact-details-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--tp-indigo-700); margin-bottom: 0.75rem; }
          .contact-details-row { display: flex; align-items: center; gap: 0.625rem; font-size: 0.9375rem; color: var(--tp-slate); margin-bottom: 0.5rem; }
          .contact-details-row a { color: var(--tp-indigo-700); text-decoration: none; }
          .contact-details-row a:hover { color: var(--tp-indigo-600); }

          .contact-form-panel { background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-lg); padding: 2.5rem; box-shadow: var(--tp-shadow-sm); }
          .contact-form-panel h2 { font-family: var(--tp-display); font-weight: 600; font-size: 1.5rem; color: var(--tp-ink); margin-bottom: 1.75rem; }
          .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
          @media (max-width: 640px) { .contact-form-row { grid-template-columns: 1fr; } }
          .contact-label { display: block; font-size: 0.8125rem; font-weight: 600; color: var(--tp-ink); margin-bottom: 0.4rem; }
          .contact-input {
            width: 100%; padding: 0.75rem 1rem; font-family: var(--tp-body); font-size: 0.9375rem;
            border-radius: var(--tp-radius-md); border: 1px solid var(--tp-line); background: var(--tp-fog);
            color: var(--tp-ink); outline: none; transition: border-color 160ms var(--tp-ease), background 160ms var(--tp-ease);
          }
          .contact-input:focus { border-color: var(--tp-lavender-400); background: #fff; }
          .contact-submit { width: 100%; justify-content: center; font-size: 1rem; padding: 1rem; border: none; cursor: pointer; }
          .contact-submit:disabled { opacity: 0.6; cursor: not-allowed; }
          .contact-error { background: #FDECEC; border: 1px solid #F3B9B9; color: #B3261E; border-radius: var(--tp-radius-md); padding: 0.75rem 1rem; margin-bottom: 1rem; font-size: 0.875rem; }
          .contact-success { text-align: center; padding: 3rem 1rem; }
          .contact-success-icon { width: 56px; height: 56px; border-radius: 50%; background: var(--tp-lavender-100); color: var(--tp-indigo-700); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
          .contact-success h2 { font-family: var(--tp-display); font-weight: 600; font-size: 1.5rem; color: var(--tp-ink); margin-bottom: 0.75rem; }
          .contact-success p { color: var(--tp-slate); margin-bottom: 2rem; }
        `}</style>

        <PageHero
          breadcrumbItems={[
            { name: "Home", url: SITE_URL },
            { name: "Contact", url: `${SITE_URL}/contact` },
          ]}
          siteUrl={SITE_URL}
          eyebrow="Get In Touch"
          h1="Book a Consultation"
          lead="Fill in the form below and our team will get back to you within 24 hours to discuss your treatment options."
        />

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-why">
            <h2>Why Choose Perfect Eyes?</h2>

            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="contact-why-item">
                <span className="contact-why-icon"><TpIcon name={item.icon} size={19} /></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}

            <div className="contact-details">
              <div className="contact-details-label">Contact Details</div>
              <div className="contact-details-row"><TpIcon name="pin" size={16} />9 Harley Street, London, W1G 9QY</div>
              <div className="contact-details-row"><TpIcon name="phone" size={15} /><a href="tel:+442074864886">020 7486 4886</a></div>
              <div className="contact-details-row"><TpIcon name="mail" size={16} /><a href="mailto:perfecteyesltd@gmail.com">perfecteyesltd@gmail.com</a></div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-panel">
            {status === "success" ? (
              <div className="contact-success">
                <div className="contact-success-icon"><TpIcon name="check" size={26} /></div>
                <h2>Message Sent!</h2>
                <p>Thank you for getting in touch. We will respond within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="tp-btn tp-btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate id="contact-form">
                <h2>Send Us a Message</h2>

                <div className="contact-form-row">
                  <div>
                    <label htmlFor="contact-name" className="contact-label">
                      Full Name <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
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
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="contact-label">
                      Email Address <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
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
                      className="contact-input"
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div>
                    <label htmlFor="contact-phone" className="contact-label">
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
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-treatment" className="contact-label">
                      Treatment of Interest
                    </label>
                    <select
                      id="contact-treatment"
                      name="treatment"
                      value={form.treatment}
                      onChange={handleChange}
                      className="contact-input"
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
                  <label htmlFor="contact-message" className="contact-label">
                    Your Message <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your concerns and what you would like to achieve…"
                    className="contact-input"
                    style={{ resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <div role="alert" className="contact-error">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  id="contact-submit"
                  disabled={status === "sending"}
                  className="tp-btn tp-btn-primary contact-submit"
                >
                  {status === "sending" ? "Sending…" : "Send Message →"}
                </button>

                <p style={{ fontSize: "0.75rem", color: "var(--tp-mist)", marginTop: "1rem", textAlign: "center" }}>
                  By submitting this form you agree to our{" "}
                  <Link href="/privacy-notice" style={{ color: "var(--tp-indigo-700)" }}>
                    Privacy Notice
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
