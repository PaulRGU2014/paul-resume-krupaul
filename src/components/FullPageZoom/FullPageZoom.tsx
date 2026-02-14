import styles from "./FullPageZoom.module.scss";

type FullPageZoomProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function FullPageZoom({ content }: FullPageZoomProps) {
  return (
    <section className={styles.wrapper}>
      <h2>FullPageZoom</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
