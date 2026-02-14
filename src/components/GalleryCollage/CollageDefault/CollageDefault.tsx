import styles from "./CollageDefault.module.scss";

type CollageDefaultProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function CollageDefault({ content }: CollageDefaultProps) {
  return (
    <section className={styles.wrapper}>
      <h2>CollageDefault</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
