import styles from "./MenuMobile.module.scss";

type MenuMobileProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function MenuMobile({ content }: MenuMobileProps) {
  return (
    <section className={styles.wrapper}>
      <h2>MenuMobile</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
