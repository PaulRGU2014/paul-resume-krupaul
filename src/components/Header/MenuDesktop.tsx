import styles from "./MenuDesktop.module.scss";

type MenuDesktopProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function MenuDesktop({ content }: MenuDesktopProps) {
  return (
    <section className={styles.wrapper}>
      <h2>MenuDesktop</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
