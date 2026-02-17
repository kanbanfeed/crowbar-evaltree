"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import PreviewModal from "@/components/PreviewModal";

type Brief = {
  id: string;
  title: string;
  slug: string;
};

const PAGE_SIZE = 10;

export default function SelectBriefsClient() {
  const params = useSearchParams();
  const plan = params.get("plan") === "pack" ? "pack" : "single";

  const { user } = useAuth();
  const isLoggedIn = !!user?.email;

  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [guestEmail, setGuestEmail] = useState("");

  /* ---------------- Email handling ---------------- */
  const emailToUse = useMemo(() => {
    return (user?.email || guestEmail || "").trim();
  }, [user?.email, guestEmail]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* ---------------- Purchased briefs ---------------- */
  const [purchasedSlugs, setPurchasedSlugs] = useState<string[]>([]);
  const [purchasedLoading, setPurchasedLoading] = useState(false);

  /* ---------------- Preview ---------------- */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");

  /* ---------------- Load briefs ---------------- */
  useEffect(() => {
    (async () => {
      const r = await fetch("/api/briefs", { cache: "no-store" });
      const d = await r.json();
      setBriefs(d.briefs || []);
    })();
  }, []);

  /* ---------------- Load purchased briefs (email-based) ---------------- */
  useEffect(() => {
    if (!emailToUse || !isValidEmail(emailToUse)) {
      setPurchasedSlugs([]);
      return;
    }

    (async () => {
      setPurchasedLoading(true);
      try {
        const r = await fetch("/api/purchase/purchased-briefs-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailToUse }),
        });

        const d = await r.json();
        setPurchasedSlugs(d.slugs || []);
      } catch {
        setPurchasedSlugs([]);
      } finally {
        setPurchasedLoading(false);
      }
    })();
  }, [emailToUse]);

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(briefs.length / PAGE_SIZE);
  const visibleBriefs = useMemo(
    () => briefs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [briefs, page]
  );

  /* ---------------- Selection (pack) ---------------- */
  function toggleSelect(slug: string) {
    if (selected.includes(slug)) {
      setSelected(selected.filter((s) => s !== slug));
      return;
    }
    if (selected.length >= 5) {
      alert("You can select only 5 briefs.");
      return;
    }
    setSelected([...selected, slug]);
  }

  /* ---------------- Preview ---------------- */
  function openPreview(slug: string, title: string) {
    setPreviewSlug(slug);
    setPreviewTitle(title);
    setPreviewOpen(true);
  }

  /* ---------------- Checkout ---------------- */
  async function checkout(slugs: string[]) {
    if (!isLoggedIn && !isValidEmail(emailToUse)) {
      alert("Please enter a valid email.");
      return;
    }

    const r = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan,
        email: emailToUse,
        briefSlugs: slugs,
      }),
    });

    const d = await r.json();
    if (d.url) window.location.href = d.url;
    else alert(d.error || "Checkout failed");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F6F8FC] to-[#EEF2FF] px-6 py-12 pb-32">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#0F1C3F]">
            {plan === "single" ? "Choose Your Brief" : "Select 5 Briefs"}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Preview expert insights before purchase. Secure. Instant access.
          </p>
        </div>

        {/* Guest email */}
        {!isLoggedIn && (
          <div className="mb-10 max-w-xl rounded-2xl bg-white/80 backdrop-blur border border-white/60 p-6 shadow-sm">
            <label className="text-sm font-semibold text-gray-700">
              Email for access
            </label>
            <input
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-3 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />
          </div>
        )}

        {/* Brief cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleBriefs.map((b) => {
            const isSelected = selected.includes(b.slug);
            const alreadyPurchased = purchasedSlugs.includes(b.slug);

            return (
              <div
                key={b.id}
                className={`
                  relative rounded-3xl bg-white p-6 transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl
                  ${isSelected
                    ? "ring-2 ring-[#FF6A00] shadow-lg"
                    : "border border-gray-200"}
                `}
              >
                {isSelected && (
                  <div className="absolute right-4 top-4 rounded-full bg-[#0F1C3F] px-3 py-1 text-xs font-semibold text-white">
                    ✓ Selected
                  </div>
                )}

                <h3 className="text-lg font-semibold text-[#0F1C3F]">
                  {b.title}
                </h3>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() => openPreview(b.slug, b.title)}
                    className="flex items-center gap-1 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                  >
                    👁 Preview
                  </button>

                  {/* 🔑 PURCHASED HANDLING */}
                  {alreadyPurchased ? (
                    <button
                      onClick={() => (window.location.href = "/evaltree/library")}
                      className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:opacity-95"
                    >
                      Already Purchased 
                    </button>
                  ) : plan === "single" ? (
                    <button
                      onClick={() => checkout([b.slug])}
                      className="rounded-full bg-[#0F1C3F] px-5 py-2 text-sm font-semibold text-white transition hover:bg-black"
                    >
                      Buy $7
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleSelect(b.slug)}
                      className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition
                        ${isSelected
                          ? "bg-[#FF6A00]"
                          : "bg-[#0F1C3F] hover:bg-black"}`}
                    >
                      {isSelected ? "Remove" : "Add"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition
                  ${page === i + 1
                    ? "bg-[#FF6A00] text-white"
                    : "bg-white hover:bg-gray-100"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sticky pack checkout */}
      {plan === "pack" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/90 backdrop-blur shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="text-sm text-gray-700">
              Selected <strong>{selected.length}</strong> / 5 briefs
            </div>

            <button
              disabled={selected.length !== 5}
              onClick={() => checkout(selected)}
              className={`rounded-xl px-8 py-3 text-sm font-semibold text-white transition
                ${selected.length === 5
                  ? "bg-[#FF6A00] hover:opacity-90"
                  : "bg-gray-300 cursor-not-allowed"}`}
            >
              Pay $8.99
            </button>
          </div>
        </div>
      )}

      <PreviewModal
        open={previewOpen}
        slug={previewSlug}
        title={previewTitle}
        onClose={() => setPreviewOpen(false)}
      />
    </main>
  );
}
