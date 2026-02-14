import styles from "./TextAndImage.module.scss";

type TextAndImageProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function TextAndImage({ content }: TextAndImageProps) {
  return (
    <section className={styles.wrapper}>
      <h2>TextAndImage</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
