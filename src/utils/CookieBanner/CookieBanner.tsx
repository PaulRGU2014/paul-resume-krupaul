"use client";

import React, { useState, useEffect } from 'react';
import styles from './CookieBanner.module.scss';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'denied');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.cookieBanner}>
      <p>We use cookies to improve your experience on our site. By using our site, you consent to cookies.</p>
      <div className={styles.buttons}>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDeny}>Deny</button>
      </div>
    </div>
  );
};

export default CookieBanner;