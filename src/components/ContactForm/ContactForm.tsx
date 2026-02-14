import styles from "./ContactForm.module.scss";

type ContactFormProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function ContactForm({ content }: ContactFormProps) {
  return (
    <section className={styles.wrapper}>
      <h2>ContactForm</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
