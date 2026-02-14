"use client"

import React, { useEffect, useRef } from 'react';
import styles from './CtaTitleImg.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Image from '@/utils/ImageLoader/ImageLoader';

interface CtaTitleImgProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function CtaTitleImg({ content }: CtaTitleImgProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        if (iframe.contentWindow && iframe.contentWindow.document.body) {
          iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 20 + 'px';
        }
      };
      iframe.addEventListener('load', handleLoad);
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [content.code.code]);

  return (
    <InViewAnim>
      <div className={styles.component}>
        <Image
          src={content.image?.asset?._ref}
          alt={content.image?.alt}
          className={styles.image}
        />
        <div className={styles.wrapper}>
          <section className={styles.content}>
            <h3>{content.title}</h3>
            <p>{content.content}</p>
          </section>
          {content.hasCode === true && !!content.code.code && <iframe
            ref={iframeRef}
            srcDoc={content.code.code}
            title="Embedded Content"
            className={styles.cta}
            sandbox="allow-scripts allow-same-origin"
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture, payment'
            loading='eager'
            scrolling="auto"
          />}
        </div>
      </div>
    </InViewAnim>
  );
}