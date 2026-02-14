import styles from "./CtasCarousel.module.scss";

type CtasCarouselProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function CtasCarousel({ content }: CtasCarouselProps) {
  return (
    <section className={styles.wrapper}>
      <h2>CtasCarousel</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
