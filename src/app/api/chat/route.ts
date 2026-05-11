export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PAUL_CONTACT, PAUL_PROFILE_SUMMARY } from "@/lib/paulProfile";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  messages?: ChatMessage[];
};

const DEFAULT_PERSONA_NAME = process.env.AI_PERSONA_NAME || PAUL_CONTACT.name;
const DEFAULT_PERSONA_TITLE = process.env.AI_PERSONA_TITLE || "Senior Full Stack Engineer";
const DEFAULT_CONTACT_EMAIL =
  process.env.AI_PERSONA_CONTACT_EMAIL || PAUL_CONTACT.email || "support@krupaul.com";

function createSystemPrompt() {
  return `You are an AI interviewer assistant representing ${DEFAULT_PERSONA_NAME}, a ${DEFAULT_PERSONA_TITLE}.
Rules:
- Ground answers in the profile context below.
- If information is not present, say that clearly and offer follow-up with Paul directly.
- Never fabricate credentials, employers, timelines, or achievements.
- Keep answers concise, professional, and recruiter-friendly.
- Encourage interviewer to share name, role/title, company, and either email or phone.
- If contact details are missing, politely ask for them before ending.
- End responses with a clear next step when relevant.

Profile Context:
${PAUL_PROFILE_SUMMARY}

Primary Contact:
- Email: ${DEFAULT_CONTACT_EMAIL}
- Phone: ${PAUL_CONTACT.phone}
- LinkedIn: ${PAUL_CONTACT.linkedin}
- GitHub: ${PAUL_CONTACT.github}
- Portfolio: ${PAUL_CONTACT.portfolio}`;
}

function toSseChunk(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

function streamTextAsSse(text: string) {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/).filter(Boolean);

  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(toSseChunk({ delta: "" })));
      for (const part of words) {
        controller.enqueue(encoder.encode(toSseChunk({ delta: part })));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

function streamOpenAiSseToClient(stream: ReadableStream<Uint8Array>) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = stream.getReader();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data:")) continue;

            const data = line.slice(5).trim();
            if (!data) continue;
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }

            try {
              const json = JSON.parse(data) as {
                choices?: Array<{
                  delta?: { content?: string };
                  message?: { content?: string };
                }>;
              };

              const token =
                json.choices?.[0]?.delta?.content || json.choices?.[0]?.message?.content || "";

              if (token) {
                controller.enqueue(encoder.encode(toSseChunk({ delta: token })));
              }
            } catch {
              // Ignore malformed upstream chunks.
            }
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch {
        controller.error(new Error("Upstream stream error"));
      } finally {
        reader.releaseLock();
      }
    },
  });
}

function fallbackReply(latestUserMessage: string) {
  const topic = latestUserMessage.trim() || "your role requirements";
  const emailLine = DEFAULT_CONTACT_EMAIL
    ? `You can also reach out at ${DEFAULT_CONTACT_EMAIL}.`
    : "";

  return `Thanks for your question about ${topic}. I can help with project experience, technical strengths, and collaboration style.\n\nBefore wrapping up, please share your name, company, role, and either email or phone so ${DEFAULT_PERSONA_NAME} can follow up directly.\n${emailLine}`;
}

function isEmailIntent(text: string) {
  const normalized = text.toLowerCase();
  return /\b(email|e-mail|mail|contact email|reach you|reach out)\b/.test(normalized);
}

function getEmailReply() {
  if (!DEFAULT_CONTACT_EMAIL) {
    return `Please share your name, company, role, and your preferred email/phone, and ${DEFAULT_PERSONA_NAME} will follow up directly.`;
  }

  return `You can contact ${DEFAULT_PERSONA_NAME} at ${DEFAULT_CONTACT_EMAIL}.\n\nIf you share your details here (name, company, role, and email/phone), I will also send a chat summary for direct follow-up.`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const messages = (body.messages || [])
      .filter((m): m is ChatMessage => {
        return Boolean(
          m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.trim().length > 0
        );
      })
      .slice(-16);

    if (!messages.length) {
      return NextResponse.json({ error: "messages are required" }, { status: 400 });
    }

    const latestUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (!latestUserMessage) {
      return NextResponse.json({ error: "A user message is required" }, { status: 400 });
    }

    if (isEmailIntent(latestUserMessage.content)) {
      return new Response(streamTextAsSse(getEmailReply()), {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(streamTextAsSse(fallbackReply(latestUserMessage.content)), {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        stream: true,
        messages: [
          { role: "system", content: createSystemPrompt() },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      }),
    });

    if (!response.ok || !response.body) {
      return new Response(streamTextAsSse(fallbackReply(latestUserMessage.content)), {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    return new Response(streamOpenAiSseToClient(response.body), {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
