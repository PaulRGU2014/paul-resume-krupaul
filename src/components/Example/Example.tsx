import styles from "./Example.module.scss";

type ExampleProps = {
  heading: string;
  body: string;
};

export default function Example({ heading, body }: ExampleProps) {
  return (
    <section className={styles.wrapper}>
      <h2>{heading}</h2>
      <p>{body}</p>
    </section>
  );
}