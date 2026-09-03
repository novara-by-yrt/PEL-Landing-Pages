import CallbackDialog from "@/components/forms/CallbackDialog";
import styles from "./StickyCallbackBar.module.css";

function PhoneIcon() {
  return (
    <svg
      className={styles.icon}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.7 16.6v2.7a1.8 1.8 0 0 1-2 1.8 17.9 17.9 0 0 1-7.8-2.8 17.6 17.6 0 0 1-5.4-5.4A17.9 17.9 0 0 1 2.7 5.1 1.8 1.8 0 0 1 4.4 3.3h2.7a1.8 1.8 0 0 1 1.8 1.5c.1.8.4 1.7.7 2.4a1.8 1.8 0 0 1-.4 1.9L8 10.4a14.4 14.4 0 0 0 5.4 5.4l1.3-1.2a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.6 2.4.7a1.8 1.8 0 0 1 1.7 1.7z" />
    </svg>
  );
}

/**
 * The pill pinned to the bottom of every page, opening the callback dialog.
 *
 * It used to own that dialog. Now CallbackDialog does, because the header and
 * every button on a landing page open the same one, and the trigger is all
 * this component still has to supply. With the state gone it renders on the
 * server; only the dialog itself is a client component.
 */
export default function StickyCallbackBar() {
  return (
    <div className={styles.bar}>
      <CallbackDialog className={styles.button} label="Begin your journey">
        <PhoneIcon />
        Begin your journey
      </CallbackDialog>
    </div>
  );
}
