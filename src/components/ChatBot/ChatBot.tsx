import styles from "./ChatBot.module.scss";

type ChatBotProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function ChatBot({ content }: ChatBotProps) {
  return (
    <section className={styles.wrapper}>
      <h2>ChatBot</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
