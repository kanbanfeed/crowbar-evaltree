"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type Brief = {
  id: string;
  title: string;
  slug: string;
  preview_url?: string;
};

export default function LibraryPage() {
  const { user, loading, signInWithCrowbar } = useAuth();
  const isLoggedIn = !!user?.email;

  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user?.email) {
      setBriefs([]);
      setBusy(false);
      return;
    }

    (async () => {
      setBusy(true);
      try {
        const r = await fetch("/api/library/briefs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const d = await r.json().catch(() => ({}));
        setBriefs(d.briefs || []);
      } catch {
        setBriefs([]);
      } finally {
        setBusy(false);
      }
    })();
  }, [isLoggedIn, user?.email]);

  if (!loading && !isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F] px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Your Library</h1>
          <p className="mt-2 text-sm opacity-80">Please log in to see your purchased briefs.</p>
          <button
            onClick={signInWithCrowbar}
            className="mt-5 rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
          >
            Continue with Crowbar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F] px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Your Library</h1>
        <p className="mt-2 text-sm opacity-80">
          Download any purchased brief anytime.
        </p>

        {busy && (
          <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-4 text-sm opacity-80">
            Loading your purchases…
          </div>
        )}

        {!busy && briefs.length === 0 && (
          <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-4 text-sm opacity-80">
            No purchased briefs found yet.
          </div>
        )}

        {!busy && briefs.length > 0 && (
          <ul className="mt-6 space-y-3">
            {briefs.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-[#F5F6F8] p-4"
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{b.title}</div>
                  <div className="text-xs opacity-70 truncate">{b.slug}</div>
                </div>

                <button
                  onClick={() => {
                    const email = encodeURIComponent(user?.email || "");
                    const slug = encodeURIComponent(b.slug);
                    window.location.href = `/api/library/download?email=${email}&slug=${slug}`;
                  }}
                  className="shrink-0 rounded-xl bg-[#0F1C3F] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
