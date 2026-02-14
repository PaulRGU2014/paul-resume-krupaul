import styles from "./Hero.module.scss";

type HeroProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function Hero({ content }: HeroProps) {
  return (
    <section className={styles.wrapper}>
      <h2>Hero</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
