"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  text: string;
  author: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Simply the best dermatologist for skin care and eye surgery. She is a safe and skilled doctor who is highly experienced and will meet your needs, her approach is a soft and natural aesthetic. She listens and communicates clearly, professionally and in a kind and personable manner. I have been looked after by Dr Sabrina for many years have always been extremely happy with her advice, procedures and results. Highly recommend, she is a talented Dr you can trust.",
    author: "Desi Stevens",
  },
  {
    text: "Dr Sabrina is the magic eye fairy ❤️ Only 10 days after my lower lid bleph and midface lift and nearly all bruising and swelling has gone. After a lot of research, I knew after my initial consultation with Dr Sabrina she was the one I trusted. Such a warm & kind woman. I am so pleased I put my Trust in Dr Shah. Immensely happy with the results and will be back to get my upper eyes done in the future. Thank you to the whole team.",
    author: "Kealey Hessey",
  },
  {
    text: "I had been recommended Dr Sabrina by a medical colleague & am extremely glad I made the journey from Southampton to the Perfect Eye Clinic in London to discuss blepharoplasty. The team were all so friendly & very professional and most importantly, Dr Sabrina informed me that I had a bilateral eye ptosis. This explained a number of issues I was experiencing. I will definitely be booking to have a correction of bilateral eye ptosis and upper blepharoplasty. Can't recommend enough.",
    author: "Jo Kirby",
  },
  {
    text: "I am so very happy with my experiences at Perfect Eyes. Dr Sabrina is an absolute Star. Extremely talented, very personable I just couldn't be happier with my results and her overall professionalism. But a big part of my review is how lovely the support staff are too. Namely Safiya and Lisa who greet you with such warmness and respect. I highly recommend this clinic as I have done so with many friends.",
    author: "Shirley Ford",
  },
];

export default function TestimonialsSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--radius-xl)",
        padding: "2.5rem",
        boxShadow: "var(--shadow-lg)",
        maxWidth: "580px",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.25rem, 3vw, 1.625rem)",
          color: "var(--clr-text)",
          marginBottom: "1.5rem",
          lineHeight: 1.3,
        }}
      >
        What our delighted patients<br />kindly say
      </h2>

      <div style={{ minHeight: "180px", position: "relative" }}>
        <p
          key={active}
          style={{
            fontSize: "var(--text-sm)",
            lineHeight: 1.75,
            color: "var(--clr-text-muted)",
            fontStyle: "italic",
          }}
        >
          &ldquo;{t.text}&rdquo;
        </p>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <Image
          src="/uploads/2024/09/star-ico.svg"
          alt="5 stars"
          width={80}
          height={16}
          style={{ height: "16px", width: "auto" }}
        />
        <span
          style={{
            fontWeight: 600,
            fontSize: "var(--text-sm)",
            color: "var(--clr-text)",
          }}
        >
          {t.author}
        </span>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              background: i === active ? "var(--clr-primary)" : "var(--clr-border)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
