'use client'

import React, { useEffect, useRef } from 'react';
import { BsXLg } from "react-icons/bs";
import styles from './Modal.module.scss';

interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousOverflow = useRef<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow.current || '';
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = previousOverflow.current || '';
      }
    };
  }, [isOpen]);
  

  return (
    <div className={`${styles.modal} ${isOpen ? styles.isOpened : ''}`}
    >
      <div className={styles.modal__content} 
        ref={modalRef}
      >
        <button className={styles.modal__close} onClick={onClose} title="Close modal" aria-label="Close modal">
          <BsXLg />
        </button>
        {children}
      </div>
    </div>
  );
}