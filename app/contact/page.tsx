"use client";

import { useState } from "react";
import Link from "next/link";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC } from "@/lib/clinic";
import { TpIcon } from "@/components/treatment/TpIcon";
import { PageHero } from "@/components/treatment/PageHero";
import styles from "./page.module.css";

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
      <div className="tp">

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

        <div className={styles.contactGrid}>
          {/* Left: Info */}
          <div className={styles.contactWhy}>
            <h2>Why Choose Perfect Eyes?</h2>

            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className={styles.contactWhyItem}>
                <span className={styles.contactWhyIcon}><TpIcon name={item.icon} size={19} /></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}

            <div className={styles.contactDetails}>
              <div className={styles.contactDetailsLabel}>Contact Details</div>
              {/* From lib/clinic, not typed in here: the address and email were
                  hardcoded to the values that file documents as superseded. */}
              <div className={styles.contactDetailsRow}><TpIcon name="pin" size={16} />{CLINIC.address}</div>
              <div className={styles.contactDetailsRow}><TpIcon name="phone" size={15} /><ClinicPhone /></div>
              <div className={styles.contactDetailsRow}><TpIcon name="mail" size={16} /><a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.contactFormPanel}>
            {status === "success" ? (
              <div className={styles.contactSuccess}>
                <div className={styles.contactSuccessIcon}><TpIcon name="check" size={26} /></div>
                <h2>Message Sent!</h2>
                <p>Thank you for getting in touch. We will respond within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="tp-btn tp-btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate id="contact-form">
                <h2>Send Us a Message</h2>

                <div className={styles.contactFormRow}>
                  <div>
                    <label htmlFor="contact-name" className={styles.contactLabel}>
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
                      className={styles.contactInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={styles.contactLabel}>
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
                      className={styles.contactInput}
                    />
                  </div>
                </div>

                <div className={styles.contactFormRow}>
                  <div>
                    <label htmlFor="contact-phone" className={styles.contactLabel}>
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
                      className={styles.contactInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-treatment" className={styles.contactLabel}>
                      Treatment of Interest
                    </label>
                    <select
                      id="contact-treatment"
                      name="treatment"
                      value={form.treatment}
                      onChange={handleChange}
                      className={styles.contactInput}
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
                  <label htmlFor="contact-message" className={styles.contactLabel}>
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
                    className={styles.contactInput}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <div role="alert" className={styles.contactError}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  id="contact-submit"
                  disabled={status === "sending"}
                  className={`tp-btn tp-btn-primary ${styles.contactSubmit}`}
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
