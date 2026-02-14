export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendSupportEmail } from "@/lib/email";

const RATE_LIMIT_WINDOW_MS = (Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 60) * 1000;
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 5;
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = rateMap.get(ip) || [];
  const recent = arr.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateMap.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateMap.set(ip, recent);
  return false;
}

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  recaptchaToken?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const { name, email, phone, message, recaptchaToken } = body;

    if (!email || !message) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const ip =
      (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "")
        .split(",")[0]
        .trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, error: "rate_limit" }, { status: 429 });
    }

    const recaptchaSecret =
      process.env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET;
    if (recaptchaSecret) {
      const valid = await verifyRecaptcha(recaptchaSecret, recaptchaToken);
      if (!valid) {
        return NextResponse.json({ success: false, error: "recaptcha" }, { status: 400 });
      }
    }

    const to = "paul@krupaul.com";
    const subject = `[KruPaul] Contact from ${name || "Anonymous"}`;
    const html = renderHtml({ name, email, phone, message });

    const sent = await sendSupportEmail({
      to,
      subject,
      html,
      replyTo: email,
    });

    if (!sent.ok) {
      return NextResponse.json({ success: false, error: "email_not_configured" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Unexpected error" }, { status: 500 });
  }
}

function renderHtml({
  name,
  email,
  phone,
  message,
}: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}) {
  return `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;">
      <h2 style="margin:0 0 8px;">New Contact Request</h2>
      <p style="margin:0 0 8px;">From: <strong>${name || "Anonymous"}</strong> (${email})</p>
      <p style="margin:0 0 12px;">Phone: ${phone || "no phone provided"}</p>
      <div style="white-space: pre-wrap; border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px;">${escapeHtml(
        message || ""
      )}</div>
    </div>
  `;
}

function escapeHtml(input: string) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function verifyRecaptcha(secret: string, token?: string): Promise<boolean> {
  if (!token) return false;
  try {
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);
    const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    if (!resp.ok) return false;
    const data = await resp.json();
    if (!data?.success) return false;
    if (typeof data?.score === "number") {
      return data.score >= 0.5;
    }
    return true;
  } catch {
    return false;
  }
}
