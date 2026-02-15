import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Lato } from "next/font/google";
import CookieBanner from "@/utils/CookieBanner/CookieBanner";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={lato.className} suppressHydrationWarning={true}>
      {children}
      <CookieBanner />
      <Analytics />
      <GoogleAnalytics gaId="G-606GP5V2VM" />
    </div>
  );
}
import "../../scss/global.scss";
