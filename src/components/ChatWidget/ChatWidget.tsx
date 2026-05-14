"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ChatWidget.module.scss";
import { BsChatText, BsXLg } from "react-icons/bs";

type Role = "user" | "assistant";

type UiMessage = {
  id: string;
  role: Role;
  content: string;
};

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  preferredContactTime: string;
};

type TranscriptLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  preferredContactTime: string;
};

type ExportTrigger = "close" | "page_unload" | "inactivity_timeout";

function normalizeLead(lead?: Partial<TranscriptLead> | null): TranscriptLead {
  return {
    name: lead?.name?.trim() || "",
    email: lead?.email?.trim() || "",
    phone: lead?.phone?.trim() || "",
    company: lead?.company?.trim() || "",
    role: lead?.role?.trim() || "",
    preferredContactTime: lead?.preferredContactTime?.trim() || "",
  };
}

function extractLikelyNameFromText(input: string): string | null {
  const text = input.trim().replace(/\s+/g, " ");
  if (!text) return null;

  if (/\d/.test(text)) return null;
  if (/[?!@#/$%^&*_=+{}<>\\[\\]|~`]/.test(text)) return null;

  const plainNamePattern = /^[A-Za-z][A-Za-z\s'.-]{1,60}$/;
  if (!plainNamePattern.test(text)) return null;

  const nonNameSignals =
    /(email|phone|contact|resume|interview|linkedin|portfolio|company|engineer|developer|hire|reach out|about)/i;
  if (nonNameSignals.test(text)) return null;

  const words = text.split(" ").filter(Boolean);
  if (words.length > 4) return null;

  return text;
}

function extractLeadFromMessages(messages: UiMessage[]): TranscriptLead | null {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content.trim())
    .filter(Boolean);

  const userText = userMessages.join("\n");

  const phoneMatch = userText.match(/(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?[\d\s-]{7,14}\d/);
  const emailMatch = userText.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  const nameMatch = userText.match(/(?:name(?:\s+is)?|i am|i'm|this is)\s*[:\-]?\s*([A-Za-z][A-Za-z\s'.-]{1,60})/i);
  const roleMatch = userText.match(
    /(?:role|position|title|i work as|i am a|i'm a)\s*[:\-]?\s*([A-Za-z][A-Za-z\s\-/&]{1,80})/i
  );
  const companyMatch = userText.match(
    /(?:company|from|at)\s*[:\-]?\s*([A-Za-z][A-Za-z0-9\s\-&,.'()]{1,80})/i
  );

  const inferredName = [...userMessages]
    .reverse()
    .map((message) => extractLikelyNameFromText(message))
    .find(Boolean);

  const extracted = normalizeLead({
    name: nameMatch?.[1] || inferredName || "",
    email: emailMatch?.[0],
    phone: phoneMatch?.[0],
    company: companyMatch?.[1],
    role: roleMatch?.[1],
  });

  if (!extracted.name && !extracted.email && !extracted.phone) {
    return null;
  }

  return extracted;
}

function getQualifiedLead(messages: UiMessage[], submittedLead: TranscriptLead | null) {
  const normalizedSubmittedLead = normalizeLead(submittedLead);
  const extractedLead = extractLeadFromMessages(messages);
  const mergedLead = normalizeLead({
    name: normalizedSubmittedLead.name || extractedLead?.name,
    email: normalizedSubmittedLead.email || extractedLead?.email,
    phone: normalizedSubmittedLead.phone || extractedLead?.phone,
    company: normalizedSubmittedLead.company || extractedLead?.company,
    role: normalizedSubmittedLead.role || extractedLead?.role,
    preferredContactTime:
      normalizedSubmittedLead.preferredContactTime || extractedLead?.preferredContactTime,
  });

  if (!mergedLead.name || (!mergedLead.email && !mergedLead.phone)) {
    return null;
  }

  return mergedLead;
}

const QUICK_REPLIES = [
  "Tell me about your strengths",
  "What roles are you targeting?",
  "Show your technical experience",
  "How do you approach teamwork?",
  "How can I contact you after this chat?",
] as const;

const WELCOME_MESSAGE =
  "Hi, I am Paul's AI assistance, his version of Paul.\nAsk me anything about experience, skills, projects, or work style.\n\nIf you share your name and contact details, I can send Paul a conversation summary so he can follow up directly.";

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    preferredContactTime: "",
  });
  const [messages, setMessages] = useState<UiMessage[]>([
    { id: createId(), role: "assistant", content: WELCOME_MESSAGE },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(createId());
  const sessionStartedAtRef = useRef(new Date().toISOString());
  const sessionExportedRef = useRef(false);
  const submittedLeadRef = useRef<TranscriptLead | null>(null);
  const messagesRef = useRef<UiMessage[]>(messages);
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);
  const hasUserStartedChat = useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages]
  );

  function scrollToBottom() {
    window.requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  }

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const onBeforeUnload = () => {
      void exportSessionIfNeeded("page_unload");
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  function scheduleInactivityExport() {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      void exportSessionIfNeeded("inactivity_timeout");
    }, 2 * 60 * 1000);
  }

  useEffect(() => {
    if (sessionExportedRef.current) return;
    if (!messages.some((message) => message.role === "user")) return;

    scheduleInactivityExport();

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [messages]);

  async function exportSessionIfNeeded(trigger: ExportTrigger) {
    if (sessionExportedRef.current) return;

    const sessionMessages = messagesRef.current;
    const qualifiedLead = getQualifiedLead(sessionMessages, submittedLeadRef.current);
    if (!qualifiedLead) return;

    const userMessageCount = sessionMessages.filter((message) => message.role === "user").length;
    if (userMessageCount === 0) return;

    try {
      const response = await fetch("/api/chat-session", {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          startedAt: sessionStartedAtRef.current,
          endedAt: new Date().toISOString(),
          trigger,
          lead: qualifiedLead,
          messages: sessionMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (response.ok) {
        sessionExportedRef.current = true;
        if (inactivityTimeoutRef.current) {
          clearTimeout(inactivityTimeoutRef.current);
        }
        return;
      }

      if (process.env.NODE_ENV !== "production") {
        const errorText = await response.text().catch(() => "");
        console.error("chat-session export failed", response.status, errorText);
      }
    } catch {
      // Ignore export failures to avoid blocking chat UX.
    }
  }

  async function handleCloseChat() {
    setIsOpen(false);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    await exportSessionIfNeeded("close");
  }

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMessage: UiMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
    };

    const assistantId = createId();

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: assistantId,
        role: "assistant",
        content: "",
      },
    ]);
    setInput("");
    setIsLoading(true);
    scrollToBottom();

    try {
      const historyForApi = [...messages, userMessage].map((message) => ({
        role: message.role,
        content: message.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: historyForApi,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("chat_request_failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() || "";

        for (const chunk of chunks) {
          const line = chunk
            .split("\n")
            .find((candidate) => candidate.trimStart().startsWith("data:"));

          if (!line) continue;

          const raw = line.replace(/^data:\s*/, "").trim();
          if (!raw) continue;
          if (raw === "[DONE]") continue;

          try {
            const parsed = JSON.parse(raw) as { delta?: string };
            const delta = parsed.delta || "";
            if (!delta) continue;

            setMessages((prev) =>
              prev.map((message) => {
                if (message.id !== assistantId) return message;
                return {
                  ...message,
                  content: `${message.content}${delta}`,
                };
              })
            );
            scrollToBottom();
          } catch {
            // Ignore malformed SSE chunks.
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((message) => {
          if (message.id !== assistantId) return message;
          return {
            ...message,
            content:
              "I cannot connect to the assistant right now. Please try again, or leave your contact details and Paul will follow up by email.",
          };
        })
      );
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;
    await sendMessage(input);
  }

  async function onLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("");

    if (!leadForm.name.trim() || (!leadForm.email.trim() && !leadForm.phone.trim())) {
      setLeadStatus("Please provide your name and either email or phone.");
      return;
    }

    try {
      const conversationSummary = messages
        .slice(-10)
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          details: conversationSummary,
        }),
      });

      if (!response.ok) {
        throw new Error("lead_submit_failed");
      }

      setLeadStatus("Thanks. Your details are captured and Paul will follow up soon.");
      submittedLeadRef.current = {
        name: leadForm.name.trim(),
        email: leadForm.email.trim(),
        phone: leadForm.phone.trim(),
        company: leadForm.company.trim(),
        role: leadForm.role.trim(),
        preferredContactTime: leadForm.preferredContactTime.trim(),
      };
      setLeadForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        preferredContactTime: "",
      });

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content:
            "Great, I have your contact details. I will share this conversation with Paul so he can follow up directly.",
        },
      ]);
      scrollToBottom();
    } catch {
      setLeadStatus("Could not submit your details right now. Please try again.");
    }
  }

  return (
    <div className={styles.widget} aria-live="polite">
      <div className={styles.inner}>
        <div className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
          <div className={styles.header}>
            <div>
              <h3 className={styles.heading}>Talk To Paul AI</h3>
              <p className={styles.subheading}>Interview assistant and portfolio guide</p>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCloseChat}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div ref={listRef} className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.row} ${
                  message.role === "user" ? styles.user : styles.assistant
                }`}
              >
                <p className={styles.bubbleMessage}>{message.content || "..."}</p>
              </div>
            ))}
          </div>

          {!hasUserStartedChat && (
            <div className={styles.quickReplies}>
              {QUICK_REPLIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={styles.quickReply}
                  onClick={() => sendMessage(item)}
                  disabled={isLoading}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {isLoading && <p className={styles.typing}>Assistant is typing...</p>}

          <div className={styles.inputArea}>
            <form className={styles.form} onSubmit={onSubmit}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <button className={styles.sendButton} type="submit" disabled={!canSend}>
                Send
              </button>
            </form>

            <button
              type="button"
              className={styles.leadToggle}
              onClick={() => setShowLeadForm((prev) => !prev)}
            >
              {showLeadForm ? "Hide contact form" : "Share contact details for follow-up"}
            </button>

            {!showLeadForm && (
              <p className={styles.notice}>
                Leave your details so Paul can follow up after this conversation.
              </p>
            )}

            {showLeadForm && (
              <form className={styles.leadForm} onSubmit={onLeadSubmit}>
                <input
                  className={styles.leadInput}
                  placeholder="Your name"
                  aria-label="Your name"
                  value={leadForm.name}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
                <input
                  className={styles.leadInput}
                  placeholder="Email"
                  aria-label="Email"
                  value={leadForm.email}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
                <input
                  className={styles.leadInput}
                  placeholder="Phone (optional if email provided)"
                  aria-label="Phone"
                  value={leadForm.phone}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, phone: event.target.value }))
                  }
                />
                <input
                  className={styles.leadInput}
                  placeholder="Company"
                  aria-label="Company"
                  value={leadForm.company}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, company: event.target.value }))
                  }
                />
                <input
                  className={styles.leadInput}
                  placeholder="Role / Title"
                  aria-label="Role"
                  value={leadForm.role}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                />
                <input
                  className={styles.leadInput}
                  placeholder="Preferred contact time"
                  aria-label="Preferred contact time"
                  value={leadForm.preferredContactTime}
                  onChange={(event) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      preferredContactTime: event.target.value,
                    }))
                  }
                />
                <button className={styles.leadSubmit} type="submit">
                  Submit
                </button>
              </form>
            )}

            {leadStatus && <p className={styles.notice}>{leadStatus}</p>}
          </div>
        </div>

        <button
          type="button"
          className={styles.bubble}
          onClick={() => {
            if (isOpen) {
              void handleCloseChat();
              return;
            }
            setIsOpen(true);
          }}
          aria-label={isOpen ? "Close assistant" : "Open assistant"}
        >
          {isOpen ? <BsXLg /> : <BsChatText />}
        </button>
      </div>
    </div>
  );
}