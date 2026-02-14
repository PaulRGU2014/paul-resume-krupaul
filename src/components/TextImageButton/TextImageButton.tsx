import styles from "./TextImageButton.module.scss";

type TextImageButtonProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function TextImageButton({ content }: TextImageButtonProps) {
  return (
    <section className={styles.wrapper}>
      <h2>TextImageButton</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
