import styles from "./TextTwoImages.module.scss";

type TextTwoImagesProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function TextTwoImages({ content }: TextTwoImagesProps) {
  return (
    <section className={styles.wrapper}>
      <h2>TextTwoImages</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
