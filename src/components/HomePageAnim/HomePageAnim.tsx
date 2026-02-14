import styles from "./HomePageAnim.module.scss";

type HomePageAnimProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function HomePageAnim({ content }: HomePageAnimProps) {
  return (
    <section className={styles.wrapper}>
      <h2>HomePageAnim</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
