import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FullPageHero from "@/components/FullPageHero/FullPageHero";
import TwoColumnSlider from "@/components/TwoColumnSlider/TwoColumnSlider";
import TestimonialsCarousel from "@/components/TestimonialsCarousel/TestimonialsCarousel";
import homeContent from "@/content/home.json";
import RichTextComp from "@/components/RichTextComp/RichTextComp";

export const metadata: Metadata = {
  title: "KruPaul | Home",
};

export default function Page() {
  return (
    <>
      <Header content={homeContent.header} />
      <section id="top" className="pageSection">
        <FullPageHero content={homeContent.hero} />
      </section>
      <section id="bio" className="pageSection">
        <RichTextComp content={homeContent.bio_section} />
      </section>
      <section id="projects" className="pageSection">
        <TwoColumnSlider content={homeContent.project_slider} />
      </section>
      <section id="testimonials" className="pageSection">
        <TestimonialsCarousel content={homeContent.testimonials} />
      </section>
      <Footer content={homeContent.footer} />
    </>
  );
}
