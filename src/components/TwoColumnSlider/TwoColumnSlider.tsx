import styles from "./TwoColumnSlider.module.scss";

type TwoColumnSliderProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function TwoColumnSlider({ content }: TwoColumnSliderProps) {
  return (
    <section className={styles.wrapper}>
      <h2>TwoColumnSlider</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
