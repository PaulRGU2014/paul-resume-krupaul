import styles from "./HomeScroll.module.scss";

type HomeScrollProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function HomeScroll({ content }: HomeScrollProps) {
  return (
    <section className={styles.wrapper}>
      <h2>HomeScroll</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
