"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { FORMS, type FormKey } from "@/lib/forms/definitions";
import { trackFormSubmitted } from "@/lib/analytics/track";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string }
      ) => number;
      getResponse: (widgetId: number) => string;
      reset: (widgetId: number) => void;
    };
    __recaptchaOnLoad?: () => void;
  }
}

let recaptchaLoader: Promise<void> | null = null;

/**
 * Loads Google's reCAPTCHA v2 script once per page, no matter how many forms
 * are mounted — explicit-render mode, matching the site key's actual
 * registration (v2 checkbox) and the same integration the WordPress Contact
 * Form 7 plugin used. Resolves once `grecaptcha.render` is available; each
 * form then renders its own checkbox widget into its own container via
 * `renderWidget` below, since forms can mount well after this script has
 * already loaded (e.g. the on-load popup, 8s after first paint).
 */
function loadRecaptcha(): Promise<void> {
  if (recaptchaLoader) return recaptchaLoader;

  recaptchaLoader = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }

    window.__recaptchaOnLoad = () => resolve();

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit";
    script.async = true;
    script.defer = true;
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

  const recaptchaContainerNode = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Renders this form's own checkbox widget once both the (shared) script
  // and this form's container are ready — whichever happens second. A plain
  // ref + one-time effect isn't enough here: the on-load popup's container
  // doesn't exist until the popup opens, well after the script has already
  // loaded, so the callback ref below re-checks readiness every time the
  // container itself mounts, not just once on the hook's own mount.
  const renderWidgetIfReady = useCallback(() => {
    if (!recaptcha || !SITE_KEY) return;
    if (!recaptchaContainerNode.current || widgetIdRef.current !== null) return;
    if (!window.grecaptcha) return;
    widgetIdRef.current = window.grecaptcha.render(recaptchaContainerNode.current, {
      sitekey: SITE_KEY,
    });
  }, [recaptcha]);

  const recaptchaRef = useCallback(
    (node: HTMLDivElement | null) => {
      recaptchaContainerNode.current = node;
      if (node) renderWidgetIfReady();
    },
    [renderWidgetIfReady]
  );

  useEffect(() => {
    if (!recaptcha || !SITE_KEY) return;
    loadRecaptcha().then(renderWidgetIfReady).catch(() => {
      /* surfaced at submit time via the missing-response check below */
    });
  }, [recaptcha, renderWidgetIfReady]);

  const reset = useCallback(() => {
    setStatus({ kind: "idle" });
    setFieldErrors({});
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;

      const resetWidget = () => {
        if (widgetIdRef.current !== null) window.grecaptcha?.reset(widgetIdRef.current);
      };

      let recaptchaToken = "";
      if (recaptcha) {
        recaptchaToken = widgetIdRef.current !== null ? window.grecaptcha?.getResponse(widgetIdRef.current) || "" : "";
        if (!recaptchaToken) {
          setStatus({ kind: "error", message: "Please complete the reCAPTCHA verification." });
          return;
        }
      }

      setStatus({ kind: "sending" });
      setFieldErrors({});

      const data = new FormData(form);
      data.set("formKey", formKey);
      // Tells the notification which of the site's pages the enquiry came from.
      data.set("_page", window.location.pathname);
      if (recaptcha) data.set("_recaptcha_token", recaptchaToken);

      try {
        const res = await fetch("/api/forms", { method: "POST", body: data });
        const result = (await res.json()) as ApiResponse;

        if (!mounted.current) return;

        if (result.status === "sent") {
          setStatus({ kind: "success", message: result.message });
          trackFormSubmitted(FORMS[formKey].title);
          form.reset();
          resetWidget();
          onSuccess?.();
          return;
        }

        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        // A reCAPTCHA response is single-use — reset so the next attempt
        // (after fixing a validation error, say) can get a fresh one.
        resetWidget();

        setStatus({
          kind: "error",
          message: result.message || "Something went wrong. Please try again.",
        });
      } catch (error) {
        if (!mounted.current) return;
        resetWidget();
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
    /** Attach to the container element the checkbox widget should render
     *  into. Unused (safely) by forms that don't set `recaptcha: true`. */
    recaptchaRef,
  };
}
