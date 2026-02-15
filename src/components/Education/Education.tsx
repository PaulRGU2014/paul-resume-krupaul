import styles from "./Education.module.scss";

interface EducationItem {
  degree: string;
  field: string;
  school: string;
  year: string;
}

interface EducationProps {
  education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  return (
    <section className={styles.section}>
      <h2>Education</h2>
      <div className={styles.stackList}>
        {education.map((item) => (
          <div key={`${item.school}-${item.year}`}>
            <strong>{item.degree}</strong>
            <span>{item.field}</span>
            <span>{item.school}</span>
            <span>{item.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
