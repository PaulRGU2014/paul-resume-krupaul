import styles from "./SubscriptionForm.module.scss";

type SubscriptionFormProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function SubscriptionForm({ content }: SubscriptionFormProps) {
  return (
    <section className={styles.wrapper}>
      <h2>SubscriptionForm</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
