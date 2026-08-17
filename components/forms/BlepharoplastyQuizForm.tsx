"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useFormSubmit } from "./useFormSubmit";
import styles from "./Forms.module.css";

/**
 * "Blepharoplasty Candidacy Quiz" — the standalone candidacy quiz.
 *
 * Field names are inherited from the original Contact Form 7 definition
 * so the notification emails keep the shape Boxly already parses:
 *   existing-customer, your-name*, your-phone*, your-email*, your-location*,
 *   prior-surgery, recent-filler, considering-6-months, budget-5000,
 *   reasons[], medications[], symptoms
 *
 * In WordPress the `.quiz-step` divs are walked by a theme script one at a time;
 * this reproduces that. Every step stays mounted (hidden, not unmounted) so the
 * native FormData carries answers from earlier steps through to submission.
 */

type Step =
  | { kind: "intro" }
  | {
      kind: "text";
      name: string;
      question: string;
      placeholder: string;
      type: "text" | "tel" | "email";
      autoComplete?: string;
      note?: string;
    }
  | { kind: "radio"; name: string; question: string; options: string[] }
  | { kind: "checkbox"; name: string; question: string; options: string[] };

const YES_NO = ["Yes", "No"];

const STEPS: Step[] = [
  { kind: "intro" },
  {
    kind: "radio",
    name: "existing-customer",
    question: "Are you an existing customer of Perfect Eyes Limited?",
    options: YES_NO,
  },
  {
    kind: "text",
    name: "your-name",
    question: "Before we start, please tell me your name",
    placeholder: "Full Name",
    type: "text",
    autoComplete: "name",
  },
  {
    kind: "text",
    name: "your-phone",
    question: "Please share your phone number",
    placeholder: "Phone",
    type: "tel",
    autoComplete: "tel",
  },
  {
    kind: "text",
    name: "your-email",
    question: "Please share your email address",
    placeholder: "Email",
    type: "email",
    autoComplete: "email",
    note: "*By sharing the details we consider your acceptance for follow-up mails",
  },
  {
    kind: "text",
    name: "your-location",
    question: "Where are you located?",
    placeholder: "Address",
    type: "text",
    autoComplete: "street-address",
  },
  {
    kind: "radio",
    name: "prior-surgery",
    question: "Have you had an eyelid or eyebrow lift surgery before?",
    options: YES_NO,
  },
  {
    kind: "radio",
    name: "recent-filler",
    question: "Have you had any filler around your eyes (upper or lower) in the last two years?",
    options: YES_NO,
  },
  {
    kind: "radio",
    name: "considering-6-months",
    question: "Are you considering to undergo the procedure within the next 6 months?",
    options: YES_NO,
  },
  {
    kind: "radio",
    name: "budget-5000",
    question: "The cost of Blepharoplasty starts from £5,000. Is this within your budget?",
    options: YES_NO,
  },
  {
    kind: "checkbox",
    name: "reasons",
    question: "Why do you want to undergo Blepharoplasty?",
    options: [
      "My eyelid has excessive skin folds",
      "There are prominent bulges under my eyelids",
      "My eyes look tired",
      "It is difficult to apply cosmetics to the eyelid due to creases and folds",
      "There is hollowing under my eyelids",
      "The excess skin makes it difficult to see",
      "All of the above",
      "None of the above",
    ],
  },
  {
    kind: "checkbox",
    name: "medications",
    question: "Do you take any of the medicines mentioned below?",
    options: [
      "Aspirin",
      "Advil",
      "Blood thinners",
      "Naproxen (Aleve)",
      "Vitamin E supplements",
      "Herbal supplements",
      "No medicine",
    ],
  },
  {
    kind: "radio",
    name: "symptoms",
    question: "Do you have any of these symptoms?",
    options: [
      "Itching/burning sensation in eye",
      "Dryness/ Foreign body sensation in eye",
      "Double vision",
      "Excessive watering from your eyes",
      "Bulging eyes",
      "None of Above",
    ],
  },
];

/** Field name as posted — CF7 suffixes multi-checkboxes with []. */
function fieldName(step: Extract<Step, { kind: "radio" | "checkbox" | "text" }>) {
  return step.kind === "checkbox" ? `${step.name}[]` : step.name;
}

export default function BlepharoplastyQuizForm() {
  const [index, setIndex] = useState(0);
  const [stepError, setStepError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const { status, fieldErrors, handleSubmit, pending } = useFormSubmit("quiz");

  const step = STEPS[index];
  const isLast = index === STEPS.length - 1;

  /** Every step is marked required in the CF7 labels, so gate advancing on it. */
  function answered(current: Step): boolean {
    const form = formRef.current;
    if (!form || current.kind === "intro") return true;

    const nodes = form.querySelectorAll<HTMLInputElement>(
      `[name="${CSS.escape(fieldName(current))}"]`
    );

    if (current.kind === "text") {
      const input = nodes[0];
      return Boolean(input && input.value.trim() !== "" && input.checkValidity());
    }
    return Array.from(nodes).some((n) => n.checked);
  }

  function next() {
    if (!answered(step)) {
      setStepError(
        step.kind === "text"
          ? "Please complete this before continuing."
          : "Please choose an answer before continuing."
      );
      return;
    }
    setStepError("");
    setIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function back() {
    setStepError("");
    setIndex((i) => Math.max(i - 1, 0));
  }

  if (status.kind === "success") {
    return (
      <div className={styles.quiz}>
        <div className={styles.quizSuccess}>
          <h2>Thank you</h2>
          <p>{status.message}</p>
        </div>
      </div>
    );
  }

  const progress = Math.round((index / (STEPS.length - 1)) * 100);

  return (
    <div className={styles.quiz}>
      {index > 0 && (
        <>
          <div className={styles.quizProgressTrack}>
            <div className={styles.quizProgressBar} style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.quizProgressLabel}>
            Question {index} of {STEPS.length - 1}
          </p>
        </>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        {STEPS.map((s, i) => (
          <div key={i} hidden={i !== index}>
            {s.kind === "intro" && (
              <>
                <Image
                  src="/blepharoplasty-quiz-intro.jpg"
                  alt="Close-up of an eye"
                  width={1400}
                  height={800}
                  className={styles.quizIntroImage}
                  priority={false}
                />
                <h2 className={styles.quizTitle}>
                  Take the quiz and find out if you are a fit for Blepharoplasty
                </h2>
                <p className={styles.quizIntroBody}>
                  As you age, the skin loses elasticity resulting in droopy eyelids with excess skin
                  and folds. Fat can bulge out and cause a puffy look around your eyes. This can make
                  you look tired, and affects your self-confidence. With Blepharoplasty, you can get
                  rid of the saggy extra skin and excess fat pads around your eyes to rejuvenate your
                  appearance. Take the quiz to find out whether you are a good candidate for
                  Blepharoplasty.
                </p>
              </>
            )}

            {s.kind === "text" && (
              <>
                <h2 className={styles.quizQuestion}>{s.question} *</h2>
                <input
                  name={s.name}
                  type={s.type}
                  placeholder={s.placeholder}
                  autoComplete={s.autoComplete}
                  className={styles.input}
                  style={{ padding: '1rem', marginBottom: '16px' }}
                />
                {s.note && <p className={styles.quizDisclaimer}>{s.note}</p>}
                {fieldErrors[s.name] && <span className={styles.fieldError}>{fieldErrors[s.name]}</span>}
              </>
            )}

            {(s.kind === "radio" || s.kind === "checkbox") && (
              <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className={styles.quizQuestion}>{s.question} *</legend>
                <div className={styles.quizOptions}>
                  {s.options.map((option) => (
                    <label key={option} className={styles.quizOption}>
                      <input
                        type={s.kind === "radio" ? "radio" : "checkbox"}
                        name={fieldName(s)}
                        value={option}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors[s.name] && <span className={styles.fieldError}>{fieldErrors[s.name]}</span>}
              </fieldset>
            )}
          </div>
        ))}

        {stepError && <p role="alert" className={`${styles.status} ${styles.statusError}`}>{stepError}</p>}
        {status.kind === "error" && (
          <p role="alert" className={`${styles.status} ${styles.statusError}`}>{status.message}</p>
        )}

        <div className={styles.quizNav}>
          {index > 0 && (
            <button type="button" className="tp-btn tp-btn-secondary" onClick={back} disabled={pending}>
              Back
            </button>
          )}
          {isLast ? (
            <button type="submit" className="tp-btn tp-btn-primary" disabled={pending}>
              {pending ? "Sending…" : "SUBMIT"}
            </button>
          ) : (
            <button type="button" className="tp-btn tp-btn-primary" onClick={next}>
              {index === 0 ? "Start the quiz" : "Next"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
