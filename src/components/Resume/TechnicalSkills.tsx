import styles from "./Resume.module.scss";

interface TechnicalSkillsProps {
  skills: string[];
}

export default function TechnicalSkills({ skills }: TechnicalSkillsProps) {
  return (
    <section className={styles.section}>
      <h2>Technical Skills</h2>
      <div className={styles.skillGrid}>
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  );
}
