import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, treatment } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // TODO: Integrate your preferred email service here.
    // Options: Resend (recommended), SendGrid, AWS SES, Nodemailer.
    //
    // Example with Resend:
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@perfecteyesltd.com",
    //   to: "enquiries@perfecteyesltd.com",
    //   subject: `New enquiry from ${name}`,
    //   html: `<p><strong>Name:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    //          <p><strong>Treatment interest:</strong> ${treatment || "Not specified"}</p>
    //          <p><strong>Message:</strong> ${message}</p>`,
    // });

    console.log("📬 Contact form submission:", { name, email, phone, treatment, message });

    return NextResponse.json(
      { success: true, message: "Thank you! We will be in touch shortly." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
