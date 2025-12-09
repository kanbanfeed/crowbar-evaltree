import type { Metadata } from "next";
import "../globals.css";

import CookieBanner from "../../components/CookieBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "Evaltree Insights by Crowbar — 5-Minute Expert Briefs",
  description:
    "Concise 3–5 page expert briefs. Buy one brief or unlock all briefs with instant delivery after payment.",
};

const ANALYTICS_ENABLED = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Header />
        {children}
        {ANALYTICS_ENABLED ? <CookieBanner /> : null}
        <Footer />
      </body>
    </html>
  );
}
