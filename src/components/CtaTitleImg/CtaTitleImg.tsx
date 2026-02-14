import styles from "./CtaTitleImg.module.scss";

type CtaTitleImgProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function CtaTitleImg({ content }: CtaTitleImgProps) {
  return (
    <section className={styles.wrapper}>
      <h2>CtaTitleImg</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
