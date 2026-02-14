"use client"

import React, { useEffect, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import styles from "./ContactForm.module.scss";
import InViewAnim from "../../utils/InViewAnim/InViewAnim";

export default function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const content = <ContactFormInner siteKey={siteKey} />;

  if (!siteKey) {
    return content;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      {content}
    </GoogleReCaptchaProvider>
  );
}

function ContactFormInner({ siteKey }: { siteKey: string }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const recaptchaReady = !siteKey || !!executeRecaptcha;
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const id = setInterval(() => {
      setCooldownSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownSeconds]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || cooldownSeconds > 0) return;
    setCaptchaError("");
    setStatus("idle");
    setStatusMessage("");

    if (!email || !message) {
      setStatus("error");
      setStatusMessage("Please complete the required fields.");
      return;
    }

    let token = "";

    if (siteKey) {
      if (!executeRecaptcha) {
        setCaptchaError("reCAPTCHA is still loading. Please try again.");
        return;
      }
      try {
        token = await executeRecaptcha("contact_submit");
      } catch (err) {
        console.error("reCAPTCHA execution failed", err);
        setCaptchaError("reCAPTCHA failed to load. Please refresh and try again.");
        return;
      }
      if (!token) {
        setCaptchaError("reCAPTCHA validation failed. Please try again.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          recaptchaToken: token,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        if (data?.error === "recaptcha") {
          setStatusMessage("reCAPTCHA verification failed. Please retry.");
          setStatus("error");
          return;
        }
        if (data?.error === "rate_limit") {
          setStatusMessage("Too many requests. Please wait and try again.");
          setStatus("error");
          return;
        }
        if (data?.error === "email_not_configured") {
          setStatusMessage("Email service is not configured yet.");
          setStatus("error");
          return;
        }
        setStatusMessage("Unable to send your message. Please try again later.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setStatusMessage("Thanks for reaching out! I'll reply as soon as I can.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCooldownSeconds(20);
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <section className={styles.form_wrapper}>
              <h3 className={styles.title}>Your Information</h3>
              <form
                className={styles.form}
                onSubmit={onSubmit}
              >
                <div className={styles.info}>
                  <div className={styles.info_wrapper}>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name here"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className={styles.info_wrapper}>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email here"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className={styles.info_wrapper}>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Enter phone number here"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone">Phone</label>
                  </div>
                </div>
                <div className={styles.project}>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Enter your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                  <label htmlFor="message">A little information about your project</label>
                </div>
                <div className={styles.recaptcha}>
                  {captchaError && (
                    <p className={styles.recaptcha_error} aria-live="polite">
                      {captchaError}
                    </p>
                  )}
                  <button type="submit" disabled={submitting || !recaptchaReady || cooldownSeconds > 0}>
                    {submitting
                      ? "Sending..."
                      : cooldownSeconds > 0
                      ? `Try again in ${cooldownSeconds}s`
                      : "Get in Touch"}
                  </button>
                  {statusMessage && (
                    <p
                      className={`${styles.status} ${
                        status === "success" ? styles.status_success : styles.status_error
                      }`}
                      aria-live="polite"
                    >
                      {statusMessage}
                    </p>
                  )}
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </InViewAnim>
  );
}
