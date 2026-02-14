import styles from "./HeroBannerImg.module.scss";

type HeroBannerImgProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function HeroBannerImg({ content }: HeroBannerImgProps) {
  return (
    <section className={styles.wrapper}>
      <h2>HeroBannerImg</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
