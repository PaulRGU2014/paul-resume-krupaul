import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FullPageHero from "@/components/FullPageHero/FullPageHero";
import TwoColumnSlider from "@/components/TwoColumnSlider/TwoColumnSlider";
import TestimonialsCarousel from "@/components/TestimonialsCarousel/TestimonialsCarousel";
import homeContent from "@/content/home.json";
import RichTextComp from "@/components/RichTextComp/RichTextComp";
import type { TwoColumnSliderContent, TextAndImageContent } from "@/types/content";
import GalleryCollage from "@/components/GalleryCollage/GalleryCollage";
import TextAndImage from "@/components/TextAndImage/TextAndImage";
import Features, { type FeaturesContent } from "@/components/Features/Features";

export const metadata: Metadata = {
  title: "Paul Thanataweenont | Home",
};

export default function Page() {
  const experienceStartYear = homeContent.work_experience.experience_start_year ?? 2020;
  const yearsExperience = Math.max(0, new Date().getFullYear() - experienceStartYear);
  const homeContentDynamicYears = {
    ...homeContent,
    bio_section: {
      ...homeContent.bio_section,
      body: homeContent.bio_section.body.replace(/six years/gi, `${yearsExperience} years`),
    },
    work_experience: {
      ...homeContent.work_experience,
      body: homeContent.work_experience.body.replace(/six years/gi, `${yearsExperience} years`),
    },
    technical_skills: {
      ...homeContent.technical_skills,
      desc: homeContent.technical_skills.desc.replace(/six years/gi, `${yearsExperience} years`),
    },
  };

  return (
    <>
      <Header content={homeContentDynamicYears.header} />
      <section id="top" className="pageSection">
        <FullPageHero content={homeContentDynamicYears.hero} />
      </section>
      <section id="bio" className="pageSection">
        {/* <RichTextComp content={homeContent.bio_section} /> */}
        <TextAndImage content={homeContentDynamicYears.bio_section as TextAndImageContent} />
      </section>
      <section id="projects" className="pageSection">
        <TwoColumnSlider content={homeContentDynamicYears.project_slider as TwoColumnSliderContent} />
      </section>
      <section id="experience" className="pageSection">
        <TwoColumnSlider content={homeContentDynamicYears.work_experience as TwoColumnSliderContent} />
      </section>
      <section id="platforms" className="pageSection">
        <GalleryCollage content={homeContentDynamicYears.platforms} />
      </section>      <section id="skills" className="pageSection">
        <Features content={homeContentDynamicYears.technical_skills as FeaturesContent} />
      </section>      <section id="references" className="pageSection">
        <TestimonialsCarousel content={homeContentDynamicYears.references} />
      </section>
      <Footer content={homeContentDynamicYears.footer} />
    </>
  );
}
