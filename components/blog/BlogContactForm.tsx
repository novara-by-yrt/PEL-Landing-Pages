"use client";

import { useState } from "react";
import { TpIcon } from "@/components/treatment/TpIcon";

export function BlogContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="blog-connect-card">
      <style>{`
        .blog-connect-card { background: #fff; border: 1px solid var(--tp-line); border-radius: var(--tp-radius-xl); padding: clamp(1.5rem, 3vw, 1.85rem); box-shadow: var(--tp-shadow-sm); }
        .blog-connect-card h3 { font-family: var(--tp-display); font-weight: 600; font-size: 1.3rem; color: var(--tp-ink); margin: 10px 0 4px; }
        .blog-connect-card > p.blog-connect-lead { font-size: 0.8375rem; color: var(--tp-slate); margin: 0 0 1.4rem; line-height: 1.5; }
        .blog-connect-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
        .blog-connect-field label { font-size: 0.8125rem; font-weight: 600; color: var(--tp-ink); }
        .blog-connect-field input, .blog-connect-field textarea {
          font-family: var(--tp-body); font-size: 0.9375rem; color: var(--tp-ink);
          padding: 0.7rem 0.9rem; border-radius: var(--tp-radius-md); border: 1px solid var(--tp-line);
          background: var(--tp-fog); outline: none; transition: border-color 160ms var(--tp-ease);
          width: 100%;
        }
        .blog-connect-field input:focus, .blog-connect-field textarea:focus { border-color: var(--tp-lavender-400); }
        .blog-connect-success { text-align: center; color: var(--tp-indigo-700); font-weight: 600; padding: 1rem 0; }
        .blog-connect-error { color: var(--semantic-error, #B4483F); font-size: 0.8125rem; margin-top: -0.5rem; margin-bottom: 1rem; }
      `}</style>
      <span className="tp-eyebrow"><TpIcon name="quote" size={13} />Get in touch</span>
      <h3>Let&rsquo;s Connect Now</h3>
      <p className="blog-connect-lead">Have a question about this article or your own eyes? Send us a message and our team will get back to you.</p>
      {status === "success" ? (
        <p className="blog-connect-success">Thank you! We will be in touch shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="blog-connect-field">
            <label htmlFor="blog-connect-name">Full name</label>
            <input id="blog-connect-name" name="name" type="text" required value={form.name} onChange={handleChange} />
          </div>
          <div className="blog-connect-field">
            <label htmlFor="blog-connect-email">Email</label>
            <input id="blog-connect-email" name="email" type="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="blog-connect-field">
            <label htmlFor="blog-connect-phone">Phone</label>
            <input id="blog-connect-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          </div>
          <div className="blog-connect-field">
            <label htmlFor="blog-connect-message">Message</label>
            <textarea id="blog-connect-message" name="message" rows={4} required value={form.message} onChange={handleChange} />
          </div>
          {status === "error" && <p className="blog-connect-error">{errorMsg}</p>}
          <button type="submit" className="tp-btn tp-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Message"} <TpIcon name="arrow" size={17} />
          </button>
        </form>
      )}
    </div>
  );
}
