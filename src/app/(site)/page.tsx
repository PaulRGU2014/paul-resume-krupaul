import type { Metadata } from "next";
import styles from "./page.module.scss";
import data from "@/data/pageData.json";
import Navigation from "@/components/Navigation/Navigation";
import Hero from "@/components/Resume/Hero/Hero";
import Experience from "@/components/Resume/Experience/Experience";
import TechnicalSkills from "@/components/Resume/TechnicalSkills/TechnicalSkills";
import CoursesTraining from "@/components/Resume/CoursesTraining/CoursesTraining";
import Education from "@/components/Resume/Education/Education";
import References from "@/components/Resume/References/References";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Paul Thanataweenont | Senior Full-Stack Engineer",
  };
}

const navigationSections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "courses", label: "Courses" },
  { id: "education", label: "Education" },
  { id: "references", label: "References" },
];

const scrollMarginStyle: React.CSSProperties = {
  scrollMarginTop: "100px",
};

export default function Page() {
  return (
    <main className={styles.page} style={{ scrollBehavior: "smooth" }}>
      <Navigation sections={navigationSections} />

      <div className={styles.shell}>
        <div id="hero" style={scrollMarginStyle}>
          <Hero 
            name={data.hero.name} 
            role={data.hero.role} 
            links={data.hero.links}
            profileTitle={data.profile.title}
            profileDescription={data.profile.description}
          />
        </div>

        <div className={styles.bodyCard}>
          <div className={styles.layoutGrid}>
            <div id="experience" style={scrollMarginStyle}>
              <Experience items={data.experience} />
            </div>

            <aside className={styles.sideCol}>
              <div id="skills" style={scrollMarginStyle}>
                <TechnicalSkills skills={data.skills} />
              </div>
              <div id="courses" style={scrollMarginStyle}>
                <CoursesTraining courses={data.courses} />
              </div>
              <div id="education" style={scrollMarginStyle}>
                <Education education={data.education} />
              </div>
              <div id="references" style={scrollMarginStyle}>
                <References references={data.references} />
              </div>
            </aside>
          </div>

          <footer className={styles.footer}>{data.footer}</footer>
        </div>
      </div>
    </main>
  );
}
