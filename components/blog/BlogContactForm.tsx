"use client";

import { useState } from "react";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./BlogContactForm.module.css";

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
    <div className={styles.blogConnectCard}>
      <span className="tp-eyebrow"><TpIcon name="quote" size={13} />Get in touch</span>
      <h3>Let&rsquo;s Connect Now</h3>
      <p className={styles.blogConnectLead}>Have a question about this article or your own eyes? Send us a message and our team will get back to you.</p>
      {status === "success" ? (
        <p className={styles.blogConnectSuccess}>Thank you! We will be in touch shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.blogConnectField}>
            <label htmlFor="blog-connect-name">Full name</label>
            <input id="blog-connect-name" name="name" type="text" required value={form.name} onChange={handleChange} />
          </div>
          <div className={styles.blogConnectField}>
            <label htmlFor="blog-connect-email">Email</label>
            <input id="blog-connect-email" name="email" type="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className={styles.blogConnectField}>
            <label htmlFor="blog-connect-phone">Phone</label>
            <input id="blog-connect-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          </div>
          <div className={styles.blogConnectField}>
            <label htmlFor="blog-connect-message">Message</label>
            <textarea id="blog-connect-message" name="message" rows={4} required value={form.message} onChange={handleChange} />
          </div>
          {status === "error" && <p className={styles.blogConnectError}>{errorMsg}</p>}
          <button type="submit" className="tp-btn tp-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
