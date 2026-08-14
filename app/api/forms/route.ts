import { NextResponse } from "next/server";
import { FORMS, isFormKey } from "@/lib/forms/definitions";
import { validate } from "@/lib/forms/validate";
import { verifyRecaptcha } from "@/lib/forms/recaptcha";
import { render, send } from "@/lib/forms/email";

/**
 * Handles every form submission on the site.
 *
 * Validation, spam checking and delivery all happen here — there is no
 * dependency on WordPress or Contact Form 7. The user-facing messages match
 * the ones the CF7 setup produced so nothing reads differently to visitors.
 */

const MESSAGES = {
  sent: "Thank you for your message. It has been sent.",
  invalid: "One or more fields have an error. Please check and try again.",
  failed: "There was an error trying to send your message. Please try again later.",
};

export async function POST(request: Request) {
  let data: FormData;

  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ status: "error", message: MESSAGES.failed }, { status: 400 });
  }

  const formKey = data.get("formKey");

  if (!isFormKey(formKey)) {
    return NextResponse.json({ status: "error", message: MESSAGES.failed }, { status: 400 });
  }

  const { values, errors } = validate(formKey, data);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { status: "invalid", message: MESSAGES.invalid, fieldErrors: errors },
      { status: 200 }
    );
  }

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip");

  if (FORMS[formKey].recaptcha) {
    const check = await verifyRecaptcha(
      (data.get("_recaptcha_token") as string) || null,
      clientIp
    );
    if (!check.ok) {
      // Logged rather than shown: telling a bot why it failed helps it retry.
      console.warn(`[forms] ${formKey} blocked as spam — ${check.reason}`);
      return NextResponse.json(
        { status: "spam", message: MESSAGES.failed },
        { status: 200 }
      );
    }
  }

  const email = render(formKey, values, {
    page: (data.get("_page") as string) || undefined,
  });

  const result = await send(email);

  if (!result.ok) {
    // No database sits behind this, so a delivery failure would otherwise lose
    // the enquiry outright. Dump it to the server log as a last resort.
    console.error(
      `[forms] ${formKey} DELIVERY FAILED — ${result.reason}\n${email.subject}\n${email.text}`
    );
    return NextResponse.json({ status: "error", message: MESSAGES.failed }, { status: 502 });
  }

  return NextResponse.json({ status: "sent", message: MESSAGES.sent }, { status: 200 });
}
