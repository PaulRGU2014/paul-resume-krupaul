"use client"

import React, { useRef } from 'react';
import styles from './Accordion.module.scss';

interface AccordionItemProps {
  index: number;
  title: any;
  content: React.ReactNode;
  expandedIndex: number | null;
  isToggle: boolean;
  hasToggle?: boolean;
  className?: string;
  toggleAccordion: (index: number) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ index, title, content, expandedIndex, isToggle, hasToggle, className, toggleAccordion, onMouseEnter, onMouseLeave }) => {
  const accordionCollapsible = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles.accordionCollapsible}
      onClick={() => toggleAccordion(index)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${styles.accordionList} ${hasToggle ? "" : styles.noToggle} ${expandedIndex === index && isToggle
        ? styles.toggleOpen
        : ""}`}>
        {title}
      </div>
      <div
        className={`${styles.content} ${className} ${expandedIndex === index && isToggle ? styles.open : styles.close
          }`}
        ref={accordionCollapsible}
        style={{
          maxHeight:
            expandedIndex === index && isToggle
              ? accordionCollapsible.current?.scrollHeight + 'px'
              : '0px',
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default AccordionItem;