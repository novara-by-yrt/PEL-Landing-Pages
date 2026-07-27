import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "6rem",
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontWeight: 700,
          lineHeight: 1,
          background: "linear-gradient(135deg, hsl(199 90% 32%), hsl(38 92% 58%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "1rem",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          marginBottom: "0.75rem",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: "var(--clr-text-muted)",
          fontSize: "1.0625rem",
          maxWidth: "38ch",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        The page you're looking for may have been moved or no longer exists.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/blog" className="btn btn-outline">
          Browse Articles
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
