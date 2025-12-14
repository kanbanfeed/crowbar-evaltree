import { Suspense } from "react";
import DownloadPackClient from "./DownloadPackClient";

export const metadata = {
  title: "Evaltree Insights by Crowbar — 5-Minute Expert Briefs",
  description: "Instant-access expert briefs. Download your purchased briefs securely after payment.",
};

export default function DownloadPackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading…</div>}>
      <DownloadPackClient />
    </Suspense>
  );
}
