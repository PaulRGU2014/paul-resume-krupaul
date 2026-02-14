import type { ReactNode } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { sanityFetch } from "@/sanity/client";

async function getDefaultData() {
  const [defaultMenuData, defaultFooterData] = await Promise.all([
    sanityFetch<any[]>({
      query: `*[_type=="header"]{...}`,
      tags: ["header"],
    }),
    sanityFetch<any[]>({
      query: `*[_type=="footer"]{...}`,
      tags: ["footer"],
    }),
  ]);
  return { defaultMenuData, defaultFooterData };
}

export default async function PageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [{ defaultMenuData, defaultFooterData }] = await Promise.all([
    getDefaultData(),
  ]);
  return (
    <>
      <Header content={(defaultMenuData as any)[0]} />
      {children}
      <Footer content={(defaultFooterData as any)[0]} />
    </>
  );
}
