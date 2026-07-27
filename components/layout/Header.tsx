import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/before-after", label: "Before & After" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container">
        <div className="header-inner">
          {/* Skip to main content — accessibility */}
          <a className="sr-only" href="#main-content">
            Skip to main content
          </a>

          <Link href="/" className="site-logo" aria-label="Skynology home">
            Skynology
          </Link>

          <nav className="main-nav" aria-label="Main navigation" id="main-nav">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="nav-cta">
              Book Consultation
            </Link>
          </nav>

          {/* Mobile toggle — JS-free using CSS :has() or details/summary */}
          <button
            className="nav-mobile-toggle"
            aria-label="Open navigation menu"
            aria-controls="main-nav"
            aria-expanded="false"
            id="mobile-nav-toggle"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
