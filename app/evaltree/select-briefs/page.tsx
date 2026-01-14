import { Suspense } from "react";
import SelectBriefsClient from "./SelectBriefsClient";

export const metadata = {
  title: "Select Briefs – Evaltree Insights by Crowbar",
  description:
    "Choose your expert briefs, preview content, and complete your purchase securely.",
};

export default function SelectBriefsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center">
          Loading briefs…
        </div>
      }
    >
      <SelectBriefsClient />
    </Suspense>
  );
}
