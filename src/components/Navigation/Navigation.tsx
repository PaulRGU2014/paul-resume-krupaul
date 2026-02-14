"use client";

import { useState, useEffect } from "react";
import styles from "./Navigation.module.scss";

interface NavigationLink {
  id: string;
  label: string;
}

interface NavigationProps {
  sections: NavigationLink[];
}

export default function Navigation({ sections }: NavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!isExpanded) return;

    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      // Keep expanded for the timeout
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <nav
      className={`${styles.navigationIsland} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={styles.label}>Menu</div>

      <div className={styles.linksContainer}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.navLink} ${activeSection === section.id ? styles.active : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleNavClick(section.id);
              setIsExpanded(true);
            }}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
