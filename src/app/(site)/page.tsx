import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FullPageHero from "@/components/FullPageHero/FullPageHero";
import TwoColumnSlider from "@/components/TwoColumnSlider/TwoColumnSlider";
import GridLinksCarousel from "@/components/GridLinksCarousel/GridLinksCarousel";
import TextAndImage from "@/components/TextAndImage/TextAndImage";
import homeContent from "@/content/home.json";

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
      <section id="experience" className="pageSection">
        <TwoColumnSlider content={homeContent.project_slider} />
      </section>
      <section id="skills" className="pageSection">
        <GridLinksCarousel content={homeContent.skills_carousel} />
      </section>
      <section id="bio" className="pageSection">
        <TextAndImage content={homeContent.bio_section} />
      </section>
      <Footer content={homeContent.footer} />
    </>
  );
}
