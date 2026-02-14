"use client";

import styles from "./CollageDefault.module.scss";
import ImageLoader from "@/utils/ImageLoader/ImageLoader";
// import content from "./content.json";
import RichText from "@/utils/RichText/RichText";
import InViewAnim from "@/utils/InViewAnim/InViewAnim";
import Modal from "@/utils/Modal/Modal";
import { useState, useEffect, useRef } from "react";

export default function CollageDefault(props: any) {
  const content = (props as any).content ?? props;
  const images = content?.images ?? [];

  const [isClient, setIsClient] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  // console.log('gallery collage', content);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
    return () => {
      setIsClient(false);
    };
  }, []);

  if (!images || images.length === 0) return <div className={styles.component} />;

  return (
    <InViewAnim>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modal_inner}>
          {currentImageIndex >= 0 && (
            <ImageLoader
              className={styles.modalImage}
              src={
                images[currentImageIndex] ? images[currentImageIndex].asset._ref : ""
              }
              alt={
                images[currentImageIndex] ? images[currentImageIndex].image_title : ""
              }
              objectFit="contain"
              objectPosition="center"
              style={
                {
                  // paddingTop: content.story[currentImageIndex].isPortrait===true ? '200%' : '100%',
                }
              }
            />
          )}
          <div className={styles.modal_content}>
            {/* {!!images[currentImageIndex].title && <h6>{images[currentImageIndex].title }</h6>} */}
            {!!images[currentImageIndex]?.image_description && (
              <RichText
                html={images[currentImageIndex].image_description}
              />
            )}
          </div>
        </div>
      </Modal>
      <div className={`${styles.component} ${styles.dark}`}>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            {images.map((item: any, index: number) => (
              <ImageLoader
                className={styles.image}
                key={index}
                style={{
                  gridRow: item.is_portrait === true ? "span 2" : "span 1",
                  paddingTop: item.is_portrait === true ? "200%" : "100%",
                  transitionDelay: isClient
                    ? `${Math.random() * 300 + 1000}ms`
                    : "0s",
                }}
                src={item.asset._ref}
                alt={item.image_title}
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
