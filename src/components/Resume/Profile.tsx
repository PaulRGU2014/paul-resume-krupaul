import styles from "./Resume.module.scss";

interface ProfileProps {
  title: string;
  description: string;
}

export default function Profile({ title, description }: ProfileProps) {
  return (
    <section className={styles.profileCard}>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
