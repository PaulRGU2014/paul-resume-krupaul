"use client";

import { useState, useCallback } from "react";
import styles from "./SubscriptionForm.module.scss";
import InViewAnim from "./../../utils/InViewAnim/InViewAnim";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

interface SubscriptionFormProps {
  content?: any; // Replace 'any' with the appropriate type
}

export default function SubscriptionForm({ content }: SubscriptionFormProps) {
  const [recaptchaValid, setRecaptchaValid] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "already-subscribed"
  >("idle");
  const [message, setMessage] = useState("");

  const handleRecaptchaVerify = useCallback((token: string) => {
    if (token) {
      setRecaptchaValid(true);
      console.log("reCAPTCHA verified successfully:", token);
    } else {
      setRecaptchaValid(false);
      console.log("reCAPTCHA verification failed");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
      } else {
        // Check if it's a duplicate subscription
        if (data.alreadySubscribed) {
          setStatus("already-subscribed");
          setMessage(
            data.error || "This email is already subscribed to our newsletter."
          );
        } else {
          setStatus("error");
          setMessage(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
    if (!recaptchaValid) {
      e.preventDefault();
      console.log("reCAPTCHA not verified");
      return;
    }
    console.log("Form submitted successfully");
  };

  return (
    <InViewAnim>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      >
        <div className={styles.component}>
          <div className={styles.wrapper}>
            <h3>Follow Us</h3>
            <p>
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading" || !email}>
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {message && (
              <p
                className={`${styles.message} ${
                  status === "success"
                    ? styles.success
                    : status === "already-subscribed"
                      ? styles.warning
                      : styles.error
                }`}
              >
                {message}
              </p>
            )}
            <p className={styles.note}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </GoogleReCaptchaProvider>
    </InViewAnim>
  );
}