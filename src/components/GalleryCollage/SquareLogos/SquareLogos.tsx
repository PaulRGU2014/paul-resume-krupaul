"use client";

import styles from "./SquareLogos.module.scss";
import ImageLoader from "@/utils/ImageLoader/ImageLoader";
// import content from "./content.json";
import RichText from "@/utils/RichText/RichText";
import InViewAnim from "@/utils/InViewAnim/InViewAnim";
import Modal from "@/utils/Modal/Modal";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export default function SquareLogos(props: any) {
  const content = (props as any).content ?? props;
  const logos = content?.logos ?? content?.images ?? [];

  const [isClient, setIsClient] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentScreenWidth, setCurrentScreenWidth] = useState<number>(0);
  const [currentImageHeight, setCurrentImageHeight] = useState<number>(0);
  const [showTransitionDelay, setShowTransitionDelay] = useState<boolean>(true);

  // Keep refs for each image so we can measure the actual element that loaded
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);

  // helper to measure first available image
  const measureFirstImage = () => {
    const el = imageRefs.current.find((x) => x) || null;
    if (el) {
      setCurrentImageHeight(el.clientHeight);
    }
  };

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
    setCurrentScreenWidth(
      typeof window !== "undefined" ? window.innerWidth : 0,
    );
    // do not set height here — wait for images to load or layout paint
    return () => {
      setIsClient(false);
      setCurrentScreenWidth(0);
      setCurrentImageHeight(0);
    };
  }, []);

  // attempt a layout measurement after paint (useLayoutEffect to minimize layout flash)
  useLayoutEffect(() => {
    // If images were already cached/painted, measure now
    measureFirstImage();
    // run when width changes or logos change
  }, [isClient, currentScreenWidth, logos.length]);

  // when resizing the window, update the currentScreenWidth state and re-measure
  useEffect(() => {
    const handleResize = () => {
      setCurrentScreenWidth(window.innerWidth);
      measureFirstImage();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use ResizeObserver to watch the first available image for size changes
  useEffect(() => {
    let observer: ResizeObserver | null = null;
    const el = imageRefs.current.find((x) => x) || null;
    if (el && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        setCurrentImageHeight(el.clientHeight);
      });
      observer.observe(el);
    }
    return () => {
      if (observer) observer.disconnect();
    };
    // re-run if logos change so we attach to the new DOM nodes
  }, [logos.length]);

  // Remove transitionDelay after 1300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransitionDelay(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    const el = imageRefs.current[index];
    if (el) {
      setCurrentImageHeight(el.clientHeight);
    } else {
      // fallback: try measuring any available image
      measureFirstImage();
    }
  };

  if (!logos || logos.length === 0) return <div className={styles.component} />;

  return (
    <InViewAnim>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modal_inner}>
          {currentImageIndex >= 0 && (
            <ImageLoader
              className={styles.modalImage}
              src={
                logos[currentImageIndex]
                  ? logos[currentImageIndex].asset._ref
                  : ""
              }
              alt={
                logos[currentImageIndex]
                  ? logos[currentImageIndex].image_title
                  : ""
              }
              objectFit="contain"
              objectPosition="center"
              style={{}}
            />
          )}
          <div className={styles.modal_content}>
            {!!logos[currentImageIndex]?.image_description && (
              <RichText html={logos[currentImageIndex].image_description} />
            )}
          </div>
        </div>
      </Modal>
      <div className={`${styles.component} ${styles.dark}`}>
        <div
          className={styles.wrapper}
          style={{
            paddingBottom:
              currentScreenWidth >= 768
                ? logos.length % 3 === 2
                  ? `${currentImageHeight / 4}px`
                  : logos.length % 3 === 1
                    ? "0px"
                    : `${currentImageHeight / 2}px`
                : logos.length % 2 === 1
                  ? "0px"
                  : `${currentImageHeight / 4}px`,
          }}
        >
         <div className={styles.content}> 
          {content.title && <h3>{content.title}</h3>}
          {content.body && (
            <h6>{content.body}</h6>
          )}
          </div>
          <div className={styles.inner}>
            {logos.map((item: any, index: number) => (
              <ImageLoader
                className={styles.image}
                key={index}
                // callback ref per image so we don't reuse a single ref for all
                ref={(el: HTMLImageElement | null) => {
                  imageRefs.current[index] = el;
                }}
                style={{
                  top:
                    currentScreenWidth >= 768
                      ? `calc(${(index % 3) * 25}%)`
                      : `calc(${(index % 2) * 25}%)`,
                  transitionDelay:
                    showTransitionDelay && isClient
                      ? `${Math.random() * 300 + 1000}ms`
                      : "0s",
                }}
                src={item.asset._ref}
                alt={item.image_title}
                objectFit="contain"
                onLoad={() => handleImageLoad(index)}
                onClick={() => {
                  setModalOpen(true);
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </InViewAnim>
  );
}
