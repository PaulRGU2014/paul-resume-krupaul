import styles from "./SquareLogos.module.scss";

type SquareLogosProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function SquareLogos({ content }: SquareLogosProps) {
  return (
    <section className={styles.wrapper}>
      <h2>SquareLogos</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
