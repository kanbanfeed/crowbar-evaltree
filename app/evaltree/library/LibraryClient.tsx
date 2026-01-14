"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AccessModal from "@/components/AccessModal";

type Brief = {
  id: string;
  title: string;
  slug: string;
};

export default function LibraryClient() {
  const { user, loading, signInWithCrowbar } = useAuth();
  const isLoggedIn = !!user?.email;

  const [items, setItems] = useState<Brief[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  /* 🔑 modal state */
  const [accessOpen, setAccessOpen] = useState(false);
  const [accessSlug, setAccessSlug] = useState<string | null>(null);
  const [accessTitle, setAccessTitle] = useState("");
  const [sessionId, setSessionId] = useState<string>("");

  /* ---------------- Load library ---------------- */
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

        const d = await r.json();

        if (!r.ok) {
          setErr(d?.error || "Failed to load library");
          setItems([]);
          return;
        }

        setItems(d.briefs || []);
        setSessionId(d.sessionId); // ✅ REQUIRED for access modal
      } catch {
        setErr("Failed to load library");
        setItems([]);
      } finally {
        setBusy(false);
      }
    })();
  }, [isLoggedIn, user?.email]);

  /* ---------------- Download (UNCHANGED) ---------------- */
  async function download(slug: string) {
    if (!user?.email) {
      setErr("Please log in to download.");
      return;
    }

    try {
      const r = await fetch("/api/library/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email: user.email }),
      });

      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        setErr(d?.error || "Download failed");
        return;
      }

      const blob = await r.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      setErr("Download failed");
    }
  }

  /* ---------------- Access (NEW) ---------------- */
  function openAccess(slug: string, title: string) {
    setAccessSlug(slug);
    setAccessTitle(title);
    setAccessOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Your Library</h1>
          <p className="mt-2 text-sm opacity-80">
            Purchased briefs appear here and can be accessed anytime.
          </p>

          {!loading && !isLoggedIn && (
            <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-5">
              <button
                onClick={signInWithCrowbar}
                className="rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Continue with Crowbar
              </button>
            </div>
          )}

          {busy && <div className="mt-6">Loading…</div>}
          {!!err && <div className="mt-6 text-red-600">{err}</div>}

          {!busy && items.length > 0 && (
            <ul className="mt-6 space-y-3">
              {items.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between rounded-2xl bg-[#F5F6F8] p-4"
                >
                  <span className="font-medium">{b.title}</span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openAccess(b.slug, b.title)}
                      className="rounded-xl border border-[#0F1C3F]/20 bg-white px-4 py-2 text-sm font-semibold hover:bg-[#EEF2FF]"
                    >
                      View Brief
                    </button>

                    <button
                      onClick={() => download(b.slug)}
                      className="rounded-xl bg-[#0F1C3F] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Download
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 🔥 ACCESS MODAL */}
      <AccessModal
        open={accessOpen}
        sessionId={sessionId}
        slug={accessSlug}
        title={accessTitle}
        onClose={() => setAccessOpen(false)}
      />
    </main>
  );
}
