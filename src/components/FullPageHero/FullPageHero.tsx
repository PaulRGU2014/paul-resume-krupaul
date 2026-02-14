import styles from "./FullPageHero.module.scss";

type FullPageHeroProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function FullPageHero({ content }: FullPageHeroProps) {
  return (
    <section className={styles.wrapper}>
      <h2>FullPageHero</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
