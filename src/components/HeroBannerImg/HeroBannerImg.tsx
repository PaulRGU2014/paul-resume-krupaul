"use client";

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroBannerImg.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Image from '@/utils/ImageLoader/ImageLoader';

gsap.registerPlugin(ScrollTrigger);

interface HeroBannerImgProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function HeroBannerImg({ content }: HeroBannerImgProps) {
  const [isClient, setIsClient] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 150);
  }, []);

  useEffect(() => {
    if (isClient) {
      const scrollTriggerInstance = gsap.fromTo(
        `.${styles.image}`,
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: `.${styles.component}`,
            start: 'top 50%',
            end: 'top top',
            scrub: true,
            onUpdate: (self) => {
              if (self.progress === 1) {
                setIsActive(true);
              } else {
                setIsActive(false);
              }
            },
          },
        }
      ).scrollTrigger;

      return () => {
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
        }
      };
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  // console.log('isActive', isActive);
  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={`${styles.overlay} ${content.is_curved===false ? styles.noCurve : ""}`}></div>
        <Image
          className={styles.image}
          src={content.image?.asset?._ref}
          alt={content.image?.alt}
          objectFit="cover"
          objectPosition="center"
          priority={true}
        />
        <div className={styles.wrapper}>
          {content.title && <h2 className={`${styles.title} ${isActive ? styles.active : ""}`}>{content.title}</h2>}
          {content.subtitle && <h4 className={`${styles.subtitle} ${isActive ? styles.active : ""}`}>{content.subtitle}</h4>}
        </div>
      </div>
    </InViewAnim>
  );
}