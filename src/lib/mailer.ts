import nodemailer from "nodemailer";

type SendEmailInput = {
  to: string;
  cc?: string[];
  subject: string;
  html: string;
  replyTo?: string;
};

type TokenCache = { accessToken: string; expiresAt: number } | null;
let tokenCache: TokenCache = null;

function hasGraphConfig() {
  return Boolean(
    process.env.GRAPH_TENANT_ID && process.env.GRAPH_CLIENT_ID && process.env.GRAPH_CLIENT_SECRET
  );
}

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
  );
}

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

async function sendWithGraph(input: SendEmailInput) {
  const sender =
    process.env.EMAIL_FROM || process.env.SUPPORT_SENDER_ADDRESS || process.env.SMTP_FROM || "support@krupaul.com";

  const token = await getGraphToken();
  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`;

  const body = {
    message: {
      subject: input.subject,
      from: { emailAddress: { address: sender } },
      replyTo: input.replyTo ? [{ emailAddress: { address: input.replyTo } }] : [],
      toRecipients: [{ emailAddress: { address: input.to } }],
      ccRecipients: (input.cc || []).map((address) => ({ emailAddress: { address } })),
      body: { contentType: "HTML", content: input.html },
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
    throw new Error(`graph_send_error:${resp.status}:${text}`);
  }
}

async function sendWithSmtp(input: SendEmailInput) {
  if (!hasSmtpConfig()) {
    throw new Error("missing_smtp_config");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: input.to,
    cc: input.cc,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
  });
}

export async function sendSupportEmail(input: SendEmailInput) {
  try {
    if (hasGraphConfig()) {
      await sendWithGraph(input);
      return { ok: true as const, provider: "graph" as const };
    }

    await sendWithSmtp(input);
    return { ok: true as const, provider: "smtp" as const };
  } catch (error) {
    if (hasGraphConfig()) {
      try {
        await sendWithSmtp(input);
        return { ok: true as const, provider: "smtp" as const };
      } catch {
        const msg = error instanceof Error ? error.message : "email_send_failed";
        return { ok: false as const, error: msg };
      }
    }

    const msg = error instanceof Error ? error.message : "email_send_failed";
    return { ok: false as const, error: msg };
  }
}
