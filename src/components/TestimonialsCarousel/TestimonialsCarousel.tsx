"use client";

import React, { useRef, useState } from "react";
import styles from "./TestimonialsCarousel.module.scss";
import InViewAnim from "@/utils/InViewAnim/InViewAnim";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Modal from "@/utils/Modal/Modal";
import { BsQuote } from "react-icons/bs";

interface TestimonialsCarouselProps {
  content: {
    title?: string;
    testimonials: {
      quote: string;
      name: string;
      role?: string;
      company?: string;
    }[];
  };
}

export default function TestimonialsCarousel({
  content,
}: TestimonialsCarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  );
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay.current],
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!content?.testimonials?.length) {
    return null;
  }

  const activeTestimonial =
    activeIndex !== null ? content.testimonials[activeIndex] : null;

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          {content.title && <h3>{content.title}</h3>}
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {content.testimonials.map((testimonial, index) => (
                <article
                  className={styles.embla__slide}
                  key={`${testimonial.name}-${index}`}
                >
                  <div className={styles.card}>
                    <span className={styles.quoteMark} aria-hidden="true">
                      <BsQuote />
                    </span>
                    <p className={styles.quote}>{testimonial.quote}</p>
                    {testimonial.quote.length > 100 && (
                      <button
                        className={styles.readMore}
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      >
                        Read full quote
                      </button>
                    )}
                    <div className={styles.meta}>
                      <span className={styles.name}>{testimonial.name}</span>
                      {(testimonial.role || testimonial.company) && (
                        <span className={styles.role}>
                          {testimonial.role}
                          {testimonial.role && testimonial.company ? " • " : ""}
                          {testimonial.company}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={activeIndex !== null} onClose={() => setActiveIndex(null)}>
        {activeTestimonial && (
          <div className={styles.modalContent}>
            <span className={styles.modalQuoteMark} aria-hidden="true">
              <BsQuote />
            </span>
            <p className={styles.modalQuote}>{activeTestimonial.quote}</p>
            <div className={styles.meta}>
              <span className={styles.name}>{activeTestimonial.name}</span>
              {(activeTestimonial.role || activeTestimonial.company) && (
                <span className={styles.role}>
                  {activeTestimonial.role}
                  {activeTestimonial.role && activeTestimonial.company
                    ? " • "
                    : ""}
                  {activeTestimonial.company}
                </span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </InViewAnim>
  );
}
