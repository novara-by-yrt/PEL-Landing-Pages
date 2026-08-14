"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { FormKey } from "@/lib/forms/definitions";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/** Kept as the reCAPTCHA v3 action name for continuity with existing stats. */
const RECAPTCHA_ACTION = "contactform";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let recaptchaLoader: Promise<void> | null = null;

/**
 * Loads Google's reCAPTCHA v3 script once per page, no matter how many forms
 * are mounted. Resolves as soon as `grecaptcha` is ready to execute.
 */
function loadRecaptcha(siteKey: string): Promise<void> {
  if (recaptchaLoader) return recaptchaLoader;

  recaptchaLoader = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => resolve());
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => window.grecaptcha?.ready(() => resolve());
    script.onerror = () => reject(new Error("Could not load reCAPTCHA."));
    document.head.appendChild(script);
  });

  return recaptchaLoader;
}

type ApiResponse = {
  status: "sent" | "invalid" | "spam" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

export type SubmitStatus =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

type Options = {
  /** Whether this form's definition expects a reCAPTCHA token. */
  recaptcha?: boolean;
  onSuccess?: () => void;
};

/**
 * Drives a form submission: collects the native FormData, attaches a reCAPTCHA
 * token when the form needs one, posts to /api/forms, and surfaces the server's
 * messages including per-field validation errors.
 */
export function useFormSubmit(formKey: FormKey, options: Options = {}) {
  const { recaptcha = false, onSuccess } = options;

  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Warm the reCAPTCHA script up front so submitting doesn't wait on a cold
  // network fetch. Failures are ignored here and surfaced at submit time.
  useEffect(() => {
    if (recaptcha && SITE_KEY) loadRecaptcha(SITE_KEY).catch(() => {});
  }, [recaptcha]);

  const reset = useCallback(() => {
    setStatus({ kind: "idle" });
    setFieldErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;

      setStatus({ kind: "sending" });
      setFieldErrors({});

      const data = new FormData(form);
      data.set("formKey", formKey);
      // Tells the notification which of the site's pages the enquiry came from.
      data.set("_page", window.location.pathname);

      try {
        if (recaptcha) {
          if (!SITE_KEY) {
            throw new Error("This form is not configured correctly. Please call the clinic.");
          }
          await loadRecaptcha(SITE_KEY);
          const token = await window.grecaptcha!.execute(SITE_KEY, {
            action: RECAPTCHA_ACTION,
          });
          data.set("_recaptcha_token", token);
        }

        const res = await fetch("/api/forms", { method: "POST", body: data });
        const result = (await res.json()) as ApiResponse;

        if (!mounted.current) return;

        if (result.status === "sent") {
          setStatus({ kind: "success", message: result.message });
          form.reset();
          onSuccess?.();
          return;
        }

        if (result.fieldErrors) setFieldErrors(result.fieldErrors);

        setStatus({
          kind: "error",
          message: result.message || "Something went wrong. Please try again.",
        });
      } catch (error) {
        if (!mounted.current) return;
        setStatus({
          kind: "error",
          message:
            error instanceof Error
              ? error.message
              : "Network error. Please try again, or call the clinic.",
        });
      }
    },
    [formKey, recaptcha, onSuccess]
  );

  return {
    status,
    fieldErrors,
    handleSubmit,
    reset,
    pending: status.kind === "sending",
  };
}
