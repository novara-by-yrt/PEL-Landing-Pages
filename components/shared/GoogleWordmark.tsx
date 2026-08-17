/**
 * The "Google" wordmark in the four brand colours, for attributing a review
 * score.
 *
 * ⚠️ This is a geometric RECONSTRUCTION, not Google's supplied artwork. It is
 * drawn from circles and arcs because Product Sans is a geometric sans, which
 * gets very close at the sizes used here, but it is not the official file and
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
      {/* Letters are set on a 92-unit body: the ring letters are r=19 circles
          on an 11-unit stroke, the G is r=25, and each letter clears the next
          by 3 units. */}
      <svg viewBox="0 0 284 92" fill="none" strokeWidth="11">
        {/* G — a ring open between 2° and 58°, with the crossbar in the gap. */}
        <path d="M55.99 46.87A25 25 0 1 0 44.25 67.2" stroke="#4285F4" />
        <path d="M34 53H61.5" stroke="#4285F4" />

        <circle cx="89" cy="51" r="19" stroke="#EA4335" />
        <circle cx="141" cy="51" r="19" stroke="#FBBC05" />

        {/* g — bowl plus a right stem that drops below the baseline and
            hooks left. */}
        <circle cx="193" cy="51" r="19" stroke="#4285F4" />
        <path d="M212 51V73C212 84 201 89 187 85" stroke="#4285F4" />

        <path d="M226 19V70" stroke="#34A853" />

        {/* e — a ring open at the lower right, crossed at the midline. */}
        <path d="M276.62 58.12A19 19 0 1 0 269.07 67.11" stroke="#EA4335" />
        <path d="M240 51H278" stroke="#EA4335" />
      </svg>
    </span>
  );
}
