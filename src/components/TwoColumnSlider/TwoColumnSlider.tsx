"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./TwoColumnSlider.module.scss";
import InViewAnim from "@/utils/InViewAnim/InViewAnim";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import RichTextUtil from "@/utils/RichText/RichText";
import Image from "@/utils/ImageLoader/ImageLoader";

interface TwoColumnSliderProps {
  content: {
    colors: string[];
    icon?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
    title: string;
    body: string;
    slides: {
      title: string;
      subtitle: string;
      desc: string;
      image?: {
        asset: {
          _ref: string;
          url?: string;
        };
        alt?: string;
      };
    }[];
  };
}

function ArrowPrev(props: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const { className, style, onClick } = props;
  return (
    <button
      className={styles.arrow_prev}
      onClick={onClick}
      aria-label="Previous slide"
      tabIndex={0}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <path
            d="M16.4124 32.134L47.8644 0.768967C48.8949 -0.258068 50.5633 -0.256341 51.592 0.77428C52.62 1.80477 52.6173 3.47408 51.5867 4.50191L22.0068 34.0001L51.5878 63.4982C52.6183 64.5262 52.6209 66.1944 51.5931 67.225C51.0774 67.7417 50.4018 68 49.7261 68C49.0523 68 48.3793 67.7434 47.8645 67.2303L16.4124 35.8661C15.9161 35.3723 15.6376 34.7003 15.6376 34.0001C15.6376 33.2999 15.9169 32.6287 16.4124 32.134Z"
            fill="#D00000"
          />
        </g>
      </svg>
    </button>
  );
}

function ArrowNext(props: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const { className, style, onClick } = props;
  return (
    <button
      className={styles.arrow_next}
      onClick={onClick}
      aria-label="Next slide"
      tabIndex={0}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <path
            d="M51.5876 32.134L20.1356 0.768967C19.1051 -0.258068 17.4367 -0.256341 16.408 0.77428C15.38 1.80477 15.3827 3.47408 16.4133 4.50191L45.9932 34.0001L16.4122 63.4982C15.3817 64.5262 15.3791 66.1944 16.4069 67.225C16.9226 67.7417 17.5982 68 18.2739 68C18.9477 68 19.6207 67.7434 20.1355 67.2303L51.5876 35.8661C52.0839 35.3723 52.3624 34.7003 52.3624 34.0001C52.3624 33.2999 52.0831 32.6287 51.5876 32.134Z"
            fill="#D00000"
          />
        </g>
      </svg>
    </button>
  );
}

export default function SliderColors({ content }: TwoColumnSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 50,
    },
    []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h3 className={styles.title}>{content.title}</h3>
            <h6 className={styles.body}>{content.body}</h6>
          </div>
          <div className={styles.inner}>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.embla__container}>
                {content.slides.map(
                  (
                    slide: { title: string; subtitle: string; desc: any; image?: any },
                    index: number
                  ) => (
                    <div className={styles.embla__slide} key={index}>
                      <div className={styles.secondary_wrapper}>
                        <section
                          className={`${styles.secondary} ${selectedIndex === index ? styles.isActive : ""}`}
                        >
                          <h6 tabIndex={0}>{slide.title}</h6>
                          <p className={styles.subtitle} tabIndex={0}>
                            {slide.subtitle}
                          </p>
                          <RichTextUtil
                            html={slide.desc}
                            className={styles.desc}
                          />
                        </section>
                      </div>
                      {slide.image && (
                        <div className={styles.primary_wrapper}>
                          <div className={styles.image}>
                            <Image
                              src={slide.image.asset?.url || slide.image.asset?._ref || ""}
                              alt={slide.image.alt || slide.title}
                              className={styles.image}
                              unoptimized={slide.image.asset?.url?.endsWith(".svg")}
                              objectFit="contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={styles.dots}>
              <ul style={{ margin: "0px" }}>
                <ArrowPrev onClick={scrollPrev} />
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${selectedIndex === index ? styles.dot_active : ""}`}
                    onClick={() => emblaApi?.scrollSnapList().length && emblaApi.scrollToSnapListIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
                <ArrowNext onClick={scrollNext} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </InViewAnim>
  );
}
