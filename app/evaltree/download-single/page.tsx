import { Suspense } from "react";
import DownloadSingleClient from "./DownloadSingleClient";

export const metadata = {
  title: "Evaltree Insights by Crowbar — 5-Minute Expert Briefs",
  description:
    "Instant-access expert briefs. Download your purchased brief securely after payment.",
};

export default function DownloadSinglePage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading…</div>}>
      <DownloadSingleClient />
    </Suspense>
  );
}
