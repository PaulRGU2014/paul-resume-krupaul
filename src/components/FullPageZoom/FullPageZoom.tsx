"use client";

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactPlayer from 'react-player';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import styles from './FullPageZoom.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function FullPageZoom({ content }: { content: any }) {
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && videoLoaded) {
      gsap.fromTo(
        `.${styles.media}`,
        { scale: 0.4 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: `.${styles.media}`,
            start: 'top top+=50%',
            end: 'top top',
            scrub: true,
          },
        }
      );
    }
  }, [isClient, videoLoaded]);

  if (!isClient) {
    return null;
  }

  return (
    <InViewAnim>
      <div className={`${styles.component} ${content.theme==='light' ? styles.light : ''}`}>
        <div className={styles.media}>
          <ReactPlayer
            className={styles.reactPlayer}
            url={content.media_url}
            loop={true}
            muted={content.is_video_muted}
            playing={true}
            playsinline={true}
            width='177vh'
            height='100%'
            onReady={() => setVideoLoaded(true)}
          />
        </div>
      </div>
    </InViewAnim>
  );
}