import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";

export function BlogCTA() {
  return (
    <section className="tp-section">
      <style>{`
        .blog-cta-band {
          background: linear-gradient(140deg, var(--tp-indigo-900), var(--tp-indigo-600));
          border-radius: var(--tp-radius-xl); padding: clamp(2.25rem, 5vw, 3.5rem);
          text-align: center; box-shadow: var(--tp-shadow-lg); position: relative; overflow: hidden;
        }
        .blog-cta-glow { position: absolute; top: -140px; left: 50%; transform: translateX(-50%); width: 480px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(167,156,211,0.35), transparent 70%); }
        .blog-cta-band h2 { position: relative; font-family: var(--tp-display); font-weight: 600; font-size: clamp(1.5rem, 3.2vw, 2.1rem); color: #fff; margin: 0 0 0.9rem; }
        .blog-cta-band p { position: relative; font-size: 1.0625rem; color: var(--tp-lavender-200); max-width: 480px; margin: 0 auto 1.75rem; line-height: 1.6; }
      `}</style>
      <div className="container">
        <div className="blog-cta-band">
          <div className="blog-cta-glow" />
          <h2>Book Your Consultation Today</h2>
          <p>Get personalised advice and expert care from our top medical professionals.</p>
          <Link href="/contact" className="tp-btn tp-btn-inverse" style={{ position: "relative" }}>
            Book Now <TpIcon name="arrow" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
