"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./RecaptchaField.module.css";

/** The v2 checkbox widget's own fixed width; it renders at exactly this. */
const RECAPTCHA_WIDTH = 304;

/**
 * Wraps the container reCAPTCHA renders into, scaling the widget to whatever
 * width the surrounding card actually has. See the stylesheet for why: the
 * widget is a fixed 304px and every phone narrower than ~414px has less room
 * than that once the page gutter, panel padding and card padding are taken
 * off, so left alone it overhangs the card's right padding.
 *
 * `innerRef` is the callback ref from useFormSubmit — it has to land on the
 * element grecaptcha renders into, so this composes its own ref alongside it
 * rather than replacing it.
 */
export default function RecaptchaField({
  innerRef,
}: {
  innerRef: (node: HTMLDivElement | null) => void;
}) {
  const wrapNode = useRef<HTMLDivElement | null>(null);
  const innerNode = useRef<HTMLDivElement | null>(null);

  const setInner = useCallback(
    (node: HTMLDivElement | null) => {
      innerNode.current = node;
      innerRef(node);
    },
    [innerRef]
  );

  useEffect(() => {
    const wrap = wrapNode.current;
    const inner = innerNode.current;
    if (!wrap || !inner) return;

    const sync = () => {
      const room = wrap.clientWidth;
      const scale = room > 0 ? Math.min(1, room / RECAPTCHA_WIDTH) : 1;
      if (wrap.style.getPropertyValue("--rc-scale") !== String(scale)) {
        wrap.style.setProperty("--rc-scale", String(scale));
      }

      // offsetHeight ignores the transform, so this is the widget's own
      // layout height — scaling it gives the height actually painted.
      const rendered = inner.childElementCount > 0;
      wrap.dataset.ready = String(rendered);
      wrap.style.height = rendered ? `${inner.offsetHeight * scale}px` : "0px";
    };

    sync();

    // Width changes come from rotation and resize; the widget appearing (or
    // swapping to its error box, which is a different height) comes from
    // grecaptcha writing into the container well after this mounts.
    const resize = new ResizeObserver(sync);
    resize.observe(wrap);
    resize.observe(inner);
    const mutate = new MutationObserver(sync);
    mutate.observe(inner, { childList: true, subtree: true });

    return () => {
      resize.disconnect();
      mutate.disconnect();
    };
  }, []);

  return (
    <div ref={wrapNode} className={styles.wrap}>
      <div ref={setInner} className={styles.inner} />
    </div>
  );
}
