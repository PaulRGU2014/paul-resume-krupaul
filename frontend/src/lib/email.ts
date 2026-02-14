type EmailAttachment = {
  filename: string;
  content: string;
  encoding?: BufferEncoding;
};

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
  replyTo?: string;
};

type TokenCache = { accessToken: string; expiresAt: number } | null;
let tokenCache: TokenCache = null;

async function getGraphToken(): Promise<string> {
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("graph_not_configured");
  }

  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt - now > 60_000) {
    return tokenCache.accessToken;
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("scope", "https://graph.microsoft.com/.default");
  params.append("client_secret", clientSecret);
  params.append("grant_type", "client_credentials");

  const resp = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  );

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`graph_token_error:${resp.status}:${text}`);
  }

  const data = (await resp.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function sendSupportEmail(
  payload: EmailPayload
): Promise<{ ok: boolean; error?: string }> {
  const sender =
    process.env.EMAIL_FROM || process.env.SUPPORT_SENDER_ADDRESS || "support@krupaul.com";

  try {
    const token = await getGraphToken();
    const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      sender
    )}/sendMail`;

    const body = {
      message: {
        subject: payload.subject,
        from: { emailAddress: { address: sender } },
        replyTo: payload.replyTo ? [{ emailAddress: { address: payload.replyTo } }] : [],
        toRecipients: [{ emailAddress: { address: payload.to } }],
        body: { contentType: "HTML", content: payload.html },
        attachments: (payload.attachments || []).map((att) => ({
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: att.filename,
          contentType: "application/octet-stream",
          contentBytes: att.encoding
            ? Buffer.from(att.content, att.encoding).toString("base64")
            : att.content,
        })),
      },
      saveToSentItems: false,
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("email: graph send error", resp.status, text);
      return { ok: false, error: `graph_send_error:${resp.status}` };
    }

    return { ok: true };
  } catch (error) {
    console.error("email: graph send error", error);
    const msg = error instanceof Error ? error.message : "unknown_error";
    return { ok: false, error: msg };
  }
}
