// Shared design tokens + cross-section utility classes for the treatment page.
// Scoped under `.tp` so nothing here leaks into the rest of the site.
export function TreatmentStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,500&display=swap');

      .tp {
        --tp-indigo-950: #121036;
        --tp-indigo-900: #1A1850;
        --tp-indigo-800: #232169;
        --tp-indigo-700: #2C2A7A;
        --tp-indigo-600: #453D9B;
        --tp-lavender-500: #736CAB;
        --tp-lavender-400: #8A84BA;
        --tp-lavender-300: #BCA0DD;
        --tp-lavender-200: #D8CCEE;
        --tp-lavender-100: #ECE6F7;
        --tp-lavender-050: #F6F3FC;
        --tp-ink: #17162E;
        --tp-slate: #56555E;
        --tp-mist: #98979E;
        --tp-line: #E6E4EE;
        --tp-paper: #FFFFFF;
        --tp-fog: #F4F3F9;
        --tp-gold: #B08A4F;
        --tp-hairline: rgba(44,42,122,0.1);
        --tp-shadow-xs: 0 1px 2px rgba(24,22,34,0.05);
        --tp-shadow-sm: 0 4px 18px -8px rgba(36,28,78,0.14);
        --tp-shadow-md: 0 18px 44px -20px rgba(36,28,78,0.2);
        --tp-shadow-lg: 0 40px 90px -34px rgba(36,28,78,0.28);
        --tp-radius-md: 14px;
        --tp-radius-lg: 22px;
        --tp-radius-xl: 32px;
        --tp-ease: cubic-bezier(.22,.61,.36,1);
        --tp-display: 'Newsreader', Georgia, serif;
        --tp-body: var(--font-inter), 'Work Sans', system-ui, sans-serif;
        background: var(--tp-paper);
        color: var(--tp-ink);
        font-family: var(--tp-body);
      }

      .tp-eyebrow {
        display: inline-flex; align-items: center; gap: 8px;
        font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--tp-lavender-500);
      }
      .tp-section { padding: clamp(44px, 5.5vw, 88px) 0; }
      .tp-section.tp-fog { background: var(--tp-fog); }
      .tp-section.tp-tint { background: var(--tp-lavender-050); }
      .tp-head { max-width: 640px; }
      .tp-head.tp-center { max-width: 720px; margin: 0 auto; text-align: center; }
      .tp-head h2 { font-family: var(--tp-display); font-weight: 600; font-size: clamp(1.6rem, 3.2vw, 2.35rem); line-height: 1.18; letter-spacing: -0.01em; color: var(--tp-ink); margin: 14px 0 0; }
      .tp-head p { font-family: var(--tp-body); font-size: 1.0625rem; line-height: 1.6; color: var(--tp-slate); margin: 16px 0 0; }

      .tp-btn {
        display: inline-flex; align-items: center; gap: 9px;
        padding: 15px 28px; border-radius: 999px;
        font-family: var(--tp-body); font-weight: 600; font-size: 0.9375rem;
        text-decoration: none; transition: transform 220ms var(--tp-ease), background 220ms var(--tp-ease), color 220ms var(--tp-ease);
        border: 1px solid transparent;
      }
      .tp-btn:hover { transform: translateY(-2px); }
      .tp-btn-primary { background: var(--tp-indigo-700); color: #fff; }
      .tp-btn-primary:hover { background: var(--tp-indigo-600); }
      .tp-btn-secondary { background: transparent; color: var(--tp-indigo-700); border-color: var(--tp-lavender-300); }
      .tp-btn-secondary:hover { background: var(--tp-lavender-050); }
      .tp-btn-inverse { background: #fff; color: var(--tp-indigo-800); }
      .tp-btn-inverse:hover { background: var(--tp-lavender-100); }

      .tp .prose h2 { font-family: var(--tp-display); font-weight: 600; color: var(--tp-ink); letter-spacing: -0.01em; }
      .tp .prose h3 { font-family: var(--tp-display); font-weight: 600; color: var(--tp-ink); }
      .tp .prose a { color: var(--tp-indigo-700); }
      .tp .prose a:hover { color: var(--tp-indigo-600); }
      .tp .prose { color: var(--tp-slate); }
    `}</style>
  );
}
