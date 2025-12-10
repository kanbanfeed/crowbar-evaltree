"use client";

import { useEffect, useState } from "react";

const KEY = "evaltree_cookie_consent_v1";

// Toggle this depending on whether you have analytics/tracking enabled.
// If you use Vercel Analytics / Google Analytics / any tracking -> keep true.
const ANALYTICS_ENABLED = true;

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    const v = localStorage.getItem(KEY);
    if (!v) setShow(true);
  }, []);

  if (!ANALYTICS_ENABLED || !show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#0F1C3F]/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm opacity-80">
            We use cookies and similar technologies to operate this site and (if enabled) measure usage.
            Learn more in our{" "}
            <a href="/evaltree/cookies" className="font-medium underline underline-offset-4">
              Cookie Policy
            </a>
            .
          </p>

          <div className="flex gap-2">
            <button
              className="rounded-xl border border-[#0F1C3F]/15 bg-white px-4 py-2 text-sm font-semibold hover:bg-[#F5F6F8]"
              onClick={() => {
                localStorage.setItem(KEY, "declined");
                setShow(false);
              }}
            >
              Decline
            </button>

            <button
              className="rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              onClick={() => {
                localStorage.setItem(KEY, "accepted");
                setShow(false);
              }}
              
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
