/**
 * The "Google" wordmark in the four brand colours, for attributing a review
 * score.
 *
 * ⚠️ This is a geometric RECONSTRUCTION, not Google's supplied artwork. It is
 * drawn from circles and arcs because Product Sans is a geometric sans, which
 * gets close at the sizes used here, but it is not the official file and
 * Google's brand guidelines ask that their own asset be used. Drop the real
 * SVG into public/ and swap this component's body for an <Image> when it is to
 * hand — every caller goes through this one file precisely so that is a
 * one-file change.
 *
 * Decorative: the surrounding text already says the rating comes from Google,
 * so it is hidden from assistive tech by the wrapper.
 */
export default function GoogleWordmark({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {/* Product Sans metrics on a 96-unit body: baseline 66, x-height top 28,
          cap top 18, ascender top 16, descender foot ~94. Ring letters are
          r=13.5 centre-line on an 11 stroke (38 outer, matching the real
          logo's x-height-to-body ratio); the G is r=18.5 (48 outer). Letters
          clear each other by 9.

          The viewBox is cropped to the ink — y from 9 to 97 — so the mark
          centres in its box instead of floating above a band of empty space,
          and so the g's descender is inside the box rather than clipped by
          its bottom edge, which is what made the g read as an o. */}
      <svg viewBox="-4 9 264 88" fill="none" strokeWidth="11">
        {/* G — ring open from 0° to 48°, the crossbar filling the gap. */}
        <path d="M42.5 42A18.5 18.5 0 1 0 36.38 55.75" stroke="#4285F4" />
        <path d="M22 46H48" stroke="#4285F4" />

        <circle cx="76" cy="47" r="13.5" stroke="#EA4335" />
        <circle cx="123" cy="47" r="13.5" stroke="#FBBC05" />

        {/* g — bowl, then a right stem dropping below the baseline and
            hooking left. The hook finishes ~20 units under the bowl so the
            two never fuse into a blob. */}
        <circle cx="170" cy="47" r="13.5" stroke="#4285F4" />
        <path d="M183.5 47V76C183.5 86 174 91 162 87" stroke="#4285F4" />

        <path d="M203.5 16V66" stroke="#34A853" />

        {/* e — ring open only BELOW the crossbar (18° to 52°), so both ends of
            the bar land on stroke that is actually drawn rather than poking
            out past the ring. */}
        <path d="M249.84 51.17A13.5 13.5 0 1 0 245.31 57.64" stroke="#EA4335" />
        <path d="M218 47H256" stroke="#EA4335" />
      </svg>
    </span>
  );
}
