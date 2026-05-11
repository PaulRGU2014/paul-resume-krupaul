export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { normalizeLead, type TranscriptLead } from "@/lib/chatLead";
import { sendSupportEmail } from "@/lib/mailer";

type LeadRequest = TranscriptLead & {
  details?: string;
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalize(value?: string) {
  return (value || "").trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadRequest;
    const lead = normalizeLead(body);

    if (!lead.name || (!lead.email && !lead.phone)) {
      return NextResponse.json(
        { success: false, error: "name and (email or phone) are required" },
        { status: 400 }
      );
    }

    const notifyTo =
      process.env.AI_CHATBOX_NOTIFY_TO || process.env.AI_PERSONA_CONTACT_EMAIL || "support@krupaul.com";
    if (!notifyTo) {
      return NextResponse.json(
        { success: false, error: "missing_notify_recipient" },
        { status: 500 }
      );
    }

    const details = normalize(body.details);

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; color: #111827;">
        <h2 style="margin: 0 0 12px;">Portfolio Chat Lead Submitted</h2>
        <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
        <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(lead.email || "Not provided")}</p>
        <p style="margin: 0 0 6px;"><strong>Phone:</strong> ${escapeHtml(lead.phone || "Not provided")}</p>
        <p style="margin: 0 0 6px;"><strong>Company:</strong> ${escapeHtml(lead.company || "Not provided")}</p>
        <p style="margin: 0 0 6px;"><strong>Role:</strong> ${escapeHtml(lead.role || "Not provided")}</p>
        <p style="margin: 0 0 12px;"><strong>Preferred Contact Time:</strong> ${escapeHtml(
          lead.preferredContactTime || "Not provided"
        )}</p>
        <h3 style="margin: 10px 0 8px;">Recent Conversation</h3>
        <div style="white-space: pre-wrap; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #f9fafb;">
${escapeHtml(details || "No conversation snippet provided")}
        </div>
      </div>
    `;

    const sent = await sendSupportEmail({
      to: notifyTo,
      subject: `[Portfolio Chat] Lead submitted: ${lead.name}`,
      html,
    });

    if (!sent.ok) {
      return NextResponse.json(
        { success: false, error: sent.error || "email_send_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
