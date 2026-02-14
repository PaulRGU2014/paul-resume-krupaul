import type { Metadata } from "next";
import styles from "./page.module.scss";
import data from "@/data/pageData.json";
import Hero from "@/components/Resume/Hero";
import Profile from "@/components/Resume/Profile";
import Experience from "@/components/Resume/Experience";
import TechnicalSkills from "@/components/Resume/TechnicalSkills";
import CoursesTraining from "@/components/Resume/CoursesTraining";
import Education from "@/components/Resume/Education";
import References from "@/components/Resume/References";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Paul Thanataweenont | Senior Full-Stack Engineer",
  };
}

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Hero name={data.hero.name} role={data.hero.role} links={data.hero.links} />

        <Profile title={data.profile.title} description={data.profile.description} />

        <div className={styles.bodyCard}>
          <div className={styles.layoutGrid}>
            <Experience items={data.experience} />

            <aside className={styles.sideCol}>
              <TechnicalSkills skills={data.skills} />
              <CoursesTraining courses={data.courses} />
              <Education education={data.education} />
              <References references={data.references} />
            </aside>
          </div>

          <footer className={styles.footer}>{data.footer}</footer>
        </div>
      </div>
    </main>
  );
}
