import { sanityFetch } from "@/sanity/client";
import ComponentLoader from "@/components/ComponentLoader";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ErrorComponent from "@/utils/ErrorComponent/ErrorComponent";
import { headers, draftMode } from "next/headers";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const slugPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const query = `*[_type=="pages"&& page_url.current=="${pathname}"]{...,components[]->}`;
  const data = await sanityFetch<any[]>({
    query,
    tags: ["pages", `pages:${slugPath}`],
  });

  if (!data || data.length === 0) {
    return {
      title: "Default Title", // Fallback title
    };
  }

  return {
    title: `${data[0].page_title} | KruPaul.com`,
  };
}

async function getPageData(pathname: string) {
  const slugPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const query = `*[_type=="pages"&& page_url.current=="${pathname}"]{
    ...,
    components[],
    footer->,
    menu->
  }`;
  const data = await sanityFetch<any[]>({
    query,
    tags: ["pages", `pages:${slugPath}`],
  });
  return data;
}

async function getDefaultData() {
  const [defaultMenuData, defaultFooterData] = await Promise.all([
    sanityFetch<any[]>({
      query: `*[_type=="header"]{...}`,
      tags: ["header"],
    }),
    sanityFetch<any[]>({
      query: `*[_type=="footer"]{...}`,
      tags: ["footer"],
    })
  ]);
  return { defaultMenuData, defaultFooterData };
}

export default async function Page() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  const [data, { defaultMenuData, defaultFooterData }] = await Promise.all([
    getPageData(pathname),
    getDefaultData()
  ]);

  if (!data || data.length === 0) {
    return (
      <>
        {/* <Header content={(defaultMenuData as any)[0]} /> */}
        <ErrorComponent status={404} />
        {/* <Footer content={(defaultFooterData as any)[0]} /> */}
      </>
    );
  }

  return (
    <>
      {/* <Header content={(data[0].menu as any)} /> */}
      {/* <DonateButton content={(data as any)[0]?.sideButton} /> */}
      <ComponentLoader components={(data[0].components as any[])} />
      {/* <Footer content={(data[0].footer as any)} /> */}
    </>
  );
}
