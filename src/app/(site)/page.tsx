import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FullPageHero from "@/components/FullPageHero/FullPageHero";
import homeContent from "@/content/home.json";

export const metadata: Metadata = {
  title: "KruPaul | Home",
};

export default function Page() {
  return (
    <>
      <Header content={homeContent.header} />
      <FullPageHero content={homeContent.hero} />
      <Footer content={homeContent.footer} />
    </>
  );
}
