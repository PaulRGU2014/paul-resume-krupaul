export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getQualifiedLead, sanitizeMessages, type TranscriptLead, type TranscriptMessage } from "@/lib/chatLead";
import { sendSupportEmail } from "@/lib/mailer";

type ChatSessionPayload = {
  sessionId?: string;
  startedAt?: string;
  endedAt?: string;
  trigger?: "close" | "page_unload" | "inactivity_timeout";
  lead?: TranscriptLead;
  messages?: TranscriptMessage[];
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderTranscriptHtml({
  sessionId,
  startedAt,
  endedAt,
  trigger,
  lead,
  messages,
  userAgent,
  clientIp,
}: {
  sessionId: string;
  startedAt: string;
  endedAt: string;
  trigger: string;
  lead: { name: string; email: string; phone: string; company: string; role: string; preferredContactTime: string };
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  userAgent: string;
  clientIp: string;
}) {
  const transcript = messages
    .map((message, index) => {
      const role = message.role === "user" ? "Interviewer" : "Paul's AI assistance";
      return `${index + 1}. [${role}] ${message.content}`;
    })
    .join("\n\n");

  return `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; color: #111827;">
      <h2 style="margin: 0 0 12px;">Paul's AI assistance Chat Session Summary</h2>
      <p style="margin: 0 0 6px;"><strong>Session ID:</strong> ${escapeHtml(sessionId)}</p>
      <p style="margin: 0 0 6px;"><strong>Started:</strong> ${escapeHtml(startedAt)}</p>
      <p style="margin: 0 0 6px;"><strong>Ended:</strong> ${escapeHtml(endedAt)}</p>
      <p style="margin: 0 0 6px;"><strong>Trigger:</strong> ${escapeHtml(trigger)}</p>
      <p style="margin: 0 0 6px;"><strong>Client IP:</strong> ${escapeHtml(clientIp || "Unknown")}</p>
      <p style="margin: 0 0 12px;"><strong>User Agent:</strong> ${escapeHtml(userAgent || "Unknown")}</p>

      <h3 style="margin: 10px 0 8px;">Interviewer Details</h3>
      <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(lead.email || "Not provided")}</p>
      <p style="margin: 0 0 6px;"><strong>Phone:</strong> ${escapeHtml(lead.phone || "Not provided")}</p>
      <p style="margin: 0 0 6px;"><strong>Company:</strong> ${escapeHtml(lead.company || "Not provided")}</p>
      <p style="margin: 0 0 6px;"><strong>Role:</strong> ${escapeHtml(lead.role || "Not provided")}</p>
      <p style="margin: 0 0 12px;"><strong>Preferred Contact Time:</strong> ${escapeHtml(
        lead.preferredContactTime || "Not provided"
      )}</p>

      <h3 style="margin: 10px 0 8px;">Transcript</h3>
      <div style="white-space: pre-wrap; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #f9fafb;">
${escapeHtml(transcript)}
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatSessionPayload;
    const messages = sanitizeMessages(body.messages);
    const lead = getQualifiedLead(body.lead, messages);

    if (!lead) {
      return NextResponse.json({ success: true, skipped: "missing_qualified_lead" });
    }

    if (!messages.length || !messages.some((message) => message.role === "user")) {
      return NextResponse.json(
        { success: false, error: "no_session_messages" },
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

    const sessionId = (body.sessionId || `session-${Date.now()}`).trim();
    const startedAt = (body.startedAt || new Date().toISOString()).trim();
    const endedAt = (body.endedAt || new Date().toISOString()).trim();
    const trigger = (body.trigger || "close").trim();

    const userAgent = req.headers.get("user-agent") || "";
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const html = renderTranscriptHtml({
      sessionId,
      startedAt,
      endedAt,
      trigger,
      lead,
      messages,
      userAgent,
      clientIp,
    });

    const sent = await sendSupportEmail({
      to: notifyTo,
      subject: `[Portfolio Chat] Interviewer lead: ${lead.name}`,
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
