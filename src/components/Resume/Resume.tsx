import styles from "./Resume.module.scss";

type ResumeProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function Resume({ content }: ResumeProps) {
  return (
    <section className={styles.wrapper}>
      <h2>Resume</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
