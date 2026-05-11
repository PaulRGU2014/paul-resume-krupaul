import type { ReactNode } from "react";
import "@/scss/global.scss";
import ChatWidget from "@/components/ChatWidget/ChatWidget";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
