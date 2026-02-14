import styles from "./Resume.module.scss";

interface Reference {
  name: string;
  title: string;
  email: string;
  phone: string;
}

interface ReferencesProps {
  references: Reference[];
}

export default function References({ references }: ReferencesProps) {
  return (
    <section className={styles.section}>
      <h2>References</h2>
      <div className={styles.stackList}>
        {references.map((ref) => (
          <div key={ref.name}>
            <strong>{ref.name}</strong>
            <span>{ref.title}</span>
            <span>{ref.email}</span>
            <span>{ref.phone}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
