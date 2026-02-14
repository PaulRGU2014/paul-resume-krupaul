import styles from "./Resume.module.scss";

interface Course {
  title: string;
  instructor: string;
  platform: string;
}

interface CoursesTrainingProps {
  courses: Course[];
}

export default function CoursesTraining({ courses }: CoursesTrainingProps) {
  return (
    <section className={styles.section}>
      <h2>Courses & Training</h2>
      <div className={styles.stackList}>
        {courses.map((course) => (
          <div key={course.title}>
            <strong>{course.title}</strong>
            <span>{course.instructor}</span>
            <span>{course.platform}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
