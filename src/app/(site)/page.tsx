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
  return (
    <>
      <Header content={homeContent.header} />
      <section id="top" className="pageSection">
        <FullPageHero content={homeContent.hero} />
      </section>
      <section id="bio" className="pageSection">
        {/* <RichTextComp content={homeContent.bio_section} /> */}
        <TextAndImage content={homeContent.bio_section as TextAndImageContent} />
      </section>
      <section id="projects" className="pageSection">
        <TwoColumnSlider content={homeContent.project_slider as TwoColumnSliderContent} />
      </section>
      <section id="platforms" className="pageSection">
        <GalleryCollage content={homeContent.platforms} />
      </section>      <section id="skills" className="pageSection">
        <Features content={homeContent.technical_skills as FeaturesContent} />
      </section>      <section id="references" className="pageSection">
        <TestimonialsCarousel content={homeContent.references} />
      </section>
      <Footer content={homeContent.footer} />
    </>
  );
}
