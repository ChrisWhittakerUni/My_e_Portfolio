import { NextResponse } from "next/server";

import { site } from "@/data/site";

/**
 * Contact endpoint.
 *
 * Delivery is optional: set RESEND_API_KEY (and optionally CONTACT_TO_EMAIL /
 * CONTACT_FROM_EMAIL) to actually send mail. Without those the route validates
 * the submission and tells the client to fall back to the mailto link, rather
 * than pretending a message was delivered.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot — must be empty. */
  company?: unknown;
}

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request body." },
      { status: 400 },
    );
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const message = asString(body.message);

  // Bots fill hidden fields; answer 200 so they learn nothing.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true, message: "Thanks — message received." });
  }

  const errors: string[] = [];
  if (name.length < 2) errors.push("a name");
  if (!EMAIL_PATTERN.test(email)) errors.push("a valid email address");
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    errors.push(`a message between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters`);
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, message: `Please provide ${errors.join(", ")}.` },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Email delivery isn't configured on this deployment yet — use the direct email link and your message will reach me.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Contact delivery failed:", response.status, await response.text());
      return NextResponse.json(
        {
          ok: false,
          message: "Couldn't send that just now — please email me directly.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact delivery threw:", error);
    return NextResponse.json(
      { ok: false, message: "Couldn't send that just now — please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — your message is on its way. I'll reply shortly.",
  });
}
