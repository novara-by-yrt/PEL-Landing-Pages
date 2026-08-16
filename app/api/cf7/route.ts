import { NextResponse } from "next/server";
import { isCf7FormKey, submitToCf7, type Cf7Response } from "@/lib/cf7";

/**
 * Proxies a form submission to Contact Form 7 in WordPress.
 *
 * The client sends the raw form fields plus a `formKey` naming which of the six
 * CF7 forms to submit to. Only keys in the registry are accepted, so a caller
 * cannot aim this at an arbitrary post ID.
 */
export async function POST(request: Request) {
  let fields: FormData;

  try {
    fields = await request.formData();
  } catch {
    return NextResponse.json(
      { status: "aborted", message: "Malformed submission." } satisfies Partial<Cf7Response>,
      { status: 400 }
    );
  }

  const formKey = fields.get("formKey");

  if (!isCf7FormKey(formKey)) {
    return NextResponse.json(
      { status: "aborted", message: "Unknown form." } satisfies Partial<Cf7Response>,
      { status: 400 }
    );
  }

  // Ours, not CF7's — it would be recorded as an unexpected field otherwise.
  fields.delete("formKey");

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip");

  try {
    const result = await submitToCf7(formKey, fields, clientIp);
    // CF7 signals validation and spam failures in the body, not the status
    // code. Pass 200 through and let the client branch on `status`.
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("CF7 submission failed:", error);
    return NextResponse.json(
      {
        status: "mail_failed",
        message:
          "We could not send that just now. Please try again, or call the clinic.",
      } satisfies Partial<Cf7Response>,
      { status: 502 }
    );
  }
}
