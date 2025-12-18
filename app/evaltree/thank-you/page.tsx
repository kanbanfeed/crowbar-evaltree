import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F6F8]" />}>
      <ThankYouClient />
    </Suspense>
  );
}
