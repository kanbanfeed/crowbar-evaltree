"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type Brief = {
  id: string;
  title: string;
  slug: string;
  preview_url?: string;
};

export default function LibraryClient() {
  const { user, loading, signInWithCrowbar } = useAuth();
  const isLoggedIn = !!user?.email;

  const [items, setItems] = useState<Brief[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    if (!isLoggedIn || !user?.email) {
      setItems([]);
      return;
    }

    (async () => {
      setBusy(true);
      setErr("");

      try {
        const r = await fetch("/api/library", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const d = await r.json().catch(() => ({}));

        if (!r.ok) {
          setErr(d?.error || "Failed to load library");
          setItems([]);
          return;
        }

        setItems(d.briefs || []);
      } catch {
        setErr("Failed to load library");
        setItems([]);
      } finally {
        setBusy(false);
      }
    })();
  }, [isLoggedIn, user?.email]);

  async function download(slug: string) {
  
    window.location.href = `/api/download?slug=${encodeURIComponent(slug)}`;
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Your Library</h1>
          <p className="mt-2 text-sm opacity-80">
            Purchased briefs appear here and can be downloaded anytime.
          </p>

          {!loading && !isLoggedIn && (
            <div className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
              <div className="text-sm font-semibold">Login required</div>
              <p className="mt-1 text-sm opacity-80">
                Please log in to view your purchased briefs.
              </p>
              <button
                onClick={signInWithCrowbar}
                className="mt-4 rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
              >
                Continue with Crowbar
              </button>
            </div>
          )}

          {busy && (
            <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-4 text-sm opacity-80">
              Loading your purchases…
            </div>
          )}

          {!!err && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm">
              {err}
            </div>
          )}

          {!busy && isLoggedIn && !err && items.length === 0 && (
            <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-4 text-sm opacity-80">
              No purchases found yet.
            </div>
          )}

          {!busy && items.length > 0 && (
            <ul className="mt-6 space-y-3">
              {items.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-[#F5F6F8] p-4"
                >
                  <span className="flex-1 min-w-0 font-medium">{b.title}</span>
                  <button
                    onClick={() => download(b.slug)}
                    className="rounded-xl bg-[#0F1C3F] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
