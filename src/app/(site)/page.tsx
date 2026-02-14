import ComponentLoader from "@/components/ComponentLoader";
import Example from "@/components/Example/Example";
import pageData from "@/data/pageData.json";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${pageData.hero.title} | KruPaul.com`,
  };
}

export default function Page() {
  return (
    <main>
      <section>
        <h1>{pageData.hero.title}</h1>
        <p>{pageData.hero.subtitle}</p>
        <a href={pageData.hero.ctaHref}>{pageData.hero.ctaText}</a>
      </section>

      {pageData.sections.map((section) => (
        <Example key={section.id} heading={section.heading} body={section.body} />
      ))}

      <ComponentLoader components={pageData.components} />
    </main>
  );
}
