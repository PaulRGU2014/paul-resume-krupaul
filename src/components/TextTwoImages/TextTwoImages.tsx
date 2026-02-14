import styles from "./TextTwoImages.module.scss";
import Image from "@/utils/ImageLoader/ImageLoader";
import InViewAnim from "./../../utils/InViewAnim/InViewAnim";

interface TextTwoImagesProps {
  content: any; // Replace 'any' with the appropriate type if known
}

export default function TextTwoImages({ content }: TextTwoImagesProps) {
  console.log("TextTwoImages content:", content);
  return (
    <InViewAnim>
      <div
        className={`${styles.component} ${content.theme === "dark" ? styles.dark : ""}`}
      >
        <div className={styles.wrapper}>
          <section className={styles.images} aria-label="Image Section">
            {content.image1.asset && <Image
              className={styles.image1}
              src={content.image1.asset._ref}
              alt={content.image1.alt || "Image 1"}
              objectFit="cover"
              objectPosition="left center"
            />}
            {content.image2.asset && <Image
              className={styles.image2}
              src={content.image2.asset._ref}
              alt={content.image2.alt || "Image 2"}
              objectFit="cover"
              objectPosition="left center"
            />}
          </section>
          <section className={styles.text} aria-label="Text Section">
            <h3 tabIndex={0}>{content.title}</h3>
            <h5 tabIndex={0}>{content.text}</h5>
          </section>
        </div>
      </div>
    </InViewAnim>
  );
}
