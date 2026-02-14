import styles from "./Footer.module.scss";

type FooterProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function Footer({ content }: FooterProps) {
  return (
    <section className={styles.wrapper}>
      <h2>Footer</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
