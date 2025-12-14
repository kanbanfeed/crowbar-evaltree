import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import CookieBanner from "../components/CookieBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // pick weights you actually use
});
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
      <body className={roboto.className} >
      <AuthProvider>
        <Header />
          {children}
        <CookieBanner /> 
        <Footer />
      </AuthProvider>
      </body>
    </html>
  );
}
