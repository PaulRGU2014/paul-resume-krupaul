import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Lato } from "next/font/google";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import CookieBanner from "@/utils/CookieBanner/CookieBanner";
import DisableDraftMode from "@/components/DisableDraftMode/DisableDraftMode";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

type SiteLayoutProps = {
  children: ReactNode;
};

export default async function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={lato.className} suppressHydrationWarning={true}>
      {children}
      <CookieBanner />
      <Analytics />
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
      <GoogleAnalytics gaId="G-606GP5V2VM" />
    </div>
  );
}
import type { ReactNode } from "react";
import "../../scss/global.scss";
