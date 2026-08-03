"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./TestimonialsSlider.module.css";

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

const ROTATE_MS = 6000;

export default function TestimonialsSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Auto-advancing content is motion: honour the OS-level preference, and
    // hold still while the visitor is reading (hover) or tabbing through.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const t = TESTIMONIALS[active];

  return (
    <figure
      className={styles.card}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <span className={styles.eyebrow}>Patient stories</span>
      <h2 className={styles.title}>What our delighted patients kindly say</h2>

      <div className={styles.quoteWrap} aria-live="polite">
        <blockquote className={styles.quote}>&ldquo;{t.text}&rdquo;</blockquote>
      </div>

      <figcaption className={styles.attribution}>
        <Image
          src="/uploads/2024/09/star-ico.svg"
          alt="Rated 5 out of 5"
          width={80}
          height={16}
          className={styles.stars}
        />
        <span className={styles.author}>{t.author}</span>
      </figcaption>

      <div className={styles.dots}>
        {TESTIMONIALS.map((item, i) => (
          <button
            key={item.author}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}`}
            aria-current={i === active}
            className={styles.dot}
          />
        ))}
      </div>
    </figure>
  );
}
