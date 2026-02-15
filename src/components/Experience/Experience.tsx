"use client";

import { useState } from "react";
import styles from "./Experience.module.scss";

interface ExperienceItem {
  title: string;
  company: string;
  location?: string | null;
  startDate: string;
  endDate: string;
  description: string[];
}

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <h2>Experience</h2>

      {items.map((item, index) => (
        <article key={index} className={styles.experienceItem}>
          <div className={styles.headingRow}>
            <h3>{item.title}</h3>
            <span>
              {item.startDate} – {item.endDate}
            </span>
          </div>
          <p className={styles.subHeading}>
            {item.company}
            {item.location && ` – ${item.location}`}
          </p>
          <ul className={styles.bullets}>
            {item.description.map((bullet, bulletIndex) => (
              <li key={bulletIndex}>{bullet}</li>
            ))}
          </ul>
          {index === 0 && (
            <button
              type="button"
              className={styles.moreBtn}
              onClick={() => toggleExpand(index)}
            >
              {expandedIndex === index ? "Show less" : "Show more"}
            </button>
          )}
        </article>
      ))}
    </section>
  );
}
