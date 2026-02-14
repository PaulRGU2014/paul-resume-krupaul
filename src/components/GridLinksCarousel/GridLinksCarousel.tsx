import styles from "./GridLinksCarousel.module.scss";

type GridLinksCarouselProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function GridLinksCarousel({ content }: GridLinksCarouselProps) {
  return (
    <section className={styles.wrapper}>
      <h2>GridLinksCarousel</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
