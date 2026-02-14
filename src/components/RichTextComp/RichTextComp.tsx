import styles from "./RichTextComp.module.scss";

type RichTextCompProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function RichTextComp({ content }: RichTextCompProps) {
  return (
    <section className={styles.wrapper}>
      <h2>RichTextComp</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
