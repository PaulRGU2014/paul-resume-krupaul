type Role = "user" | "assistant";

export type TranscriptMessage = {
  role?: Role;
  content?: string;
};

export type TranscriptLead = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  preferredContactTime?: string;
};

export function normalizeLead(lead?: TranscriptLead | null) {
  return {
    name: (lead?.name || "").trim(),
    email: (lead?.email || "").trim(),
    phone: (lead?.phone || "").trim(),
    company: (lead?.company || "").trim(),
    role: (lead?.role || "").trim(),
    preferredContactTime: (lead?.preferredContactTime || "").trim(),
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

function extractLeadFromMessages(messages: Array<{ role: Role; content: string }>) {
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

export function getQualifiedLead(
  submittedLead: TranscriptLead | undefined,
  messages: Array<{ role: Role; content: string }>
) {
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

export function sanitizeMessages(messages: TranscriptMessage[] | undefined) {
  return (messages || [])
    .filter((message) => {
      return Boolean(
        message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0
      );
    })
    .slice(-80) as Array<{ role: Role; content: string }>;
}
