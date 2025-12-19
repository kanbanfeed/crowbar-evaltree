"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

type Brief = {
  id: string;
  title: string;
  slug: string;
  preview_url: string;
};

export default function EvaltreeLanding() {
  const { user, loading, signInWithCrowbar } = useAuth();
  const isLoggedIn = !!user?.email;

  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [count, setCount] = useState<number>(0);

  const packEnabled = count >= 5;

  //  Purchased slugs for logged-in user (persistent recognition on landing)
  const [purchasedSlugs, setPurchasedSlugs] = useState<string[]>([]);
  const [purchasedLoading, setPurchasedLoading] = useState(false);

  //  Preview modal state (ONLY affects preview section)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // Load briefs + count
  useEffect(() => {
    (async () => {
      try {
        const r1 = await fetch("/api/briefs", { cache: "no-store" });
        const d1 = await r1.json();
        setBriefs(d1.briefs || []);

        const r2 = await fetch("/api/briefs/count", { cache: "no-store" });
        const d2 = await r2.json();
        setCount(d2.count || 0);
      } catch {
        setBriefs([]);
        setCount(0);
      }
    })();
  }, []);

  //  Fetch purchased slugs for user email (landing has no session_id)
  useEffect(() => {
    if (!isLoggedIn || !user?.email) {
      setPurchasedSlugs([]);
      return;
    }

    (async () => {
      setPurchasedLoading(true);
      try {
        const r = await fetch("/api/purchase/purchased-briefs-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const d = await r.json().catch(() => ({}));
        setPurchasedSlugs(d.slugs || []);
      } catch {
        setPurchasedSlugs([]);
      } finally {
        setPurchasedLoading(false);
      }
    })();
  }, [isLoggedIn, user?.email]);

  //  Pricing section checkout (single/pack)
  async function startCheckout(plan: "single" | "pack") {
    if (!isLoggedIn) return;

    const r = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan,
        email: user?.email, //  pass login email to backend
      }),
    });

    const d = await r.json().catch(() => ({}));
    if (d.url) window.location.href = d.url;
    else alert(d.error || "Checkout failed");
  }

  //  Per-brief checkout (Single brief)
  async function checkoutSelected(slug: string) {
    if (!isLoggedIn) return;

    // don’t allow checkout for already purchased brief
    if (purchasedSlugs.includes(slug)) return;

    const r = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: "single",
        briefSlug: slug,
        email: user?.email, //  pass login email to backend
      }),
    });

    const d = await r.json().catch(() => ({}));
    if (d.url) window.location.href = d.url;
    else alert(d.error || "Checkout failed");
  }

  function openPreview(slug: string, title: string) {
    setPreviewSlug(slug);
    setPreviewTitle(title);
    setPreviewOpen(true);
  }

  function closePreview() {
    setPreviewOpen(false);
    setPreviewSlug(null);
    setPreviewTitle("");
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pb-10 pt-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F8] px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
            <span className="opacity-80">Concise research briefs • 3–5 pages</span>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
            Evaltree Insights by Crowbar
          </h1>

          <p className="mt-3 text-lg opacity-80 md:text-xl">
            Understand anything in 5 minutes.
          </p>

          {!loading && !isLoggedIn && (
            <div className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
              <div className="text-sm font-semibold">Login required</div>
              <p className="mt-1 text-sm opacity-80">
                To purchase and access paid briefs, please log in with your Crowbar account.
              </p>
              <button
                onClick={signInWithCrowbar}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
              >
                Continue with Crowbar
              </button>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
            onClick={() => { document.getElementById("previews")?.scrollIntoView({ behavior: "smooth" });}}
              // onClick={() => startCheckout("single")}
              disabled={!isLoggedIn}
              className={[
                "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold shadow-sm transition-transform transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]",
                isLoggedIn
                  ? "bg-[#FF6A00] text-white hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px]"
                  : "cursor-not-allowed bg-[#9aa0aa] text-white/90",
              ].join(" ")}
            >
              Buy Single Brief – $2.99 USD
            </button>

            <button
              onClick={() => packEnabled && startCheckout("pack")}
              disabled={!isLoggedIn || !packEnabled}
              className={[
                "inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold transition-transform transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]",
                isLoggedIn && packEnabled
                  ? "border-[#FF6A00] bg-white text-[#0F1C3F] hover:bg-[#FF6A00] hover:text-white hover:shadow-md active:bg-[#e65f00] active:text-white active:scale-95 active:translate-y-[1px]"
                  : "cursor-not-allowed border-[#0F1C3F]/20 bg-[#F5F6F8] text-[#0F1C3F]/50",
              ].join(" ")}
            >
              Buy Five Briefs – $8.99 USD
            </button>
          </div>

          <p className="mt-3 text-xs opacity-70">
            Prices shown are exclusive of VAT. VAT is not currently charged but may be applied if legally required.
          </p>

          {!packEnabled && (
            <p className="mt-4 text-sm opacity-70">
              The 5-brief bundle will be available once five briefs are published.
            </p>
          )}

          {!isLoggedIn && (
            <p className="mt-3 text-sm opacity-70">
              Purchases are available after login.
            </p>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-24">
        <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-3 md:p-10">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-2 text-sm opacity-70">Fast, clear, decision-ready.</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-base leading-relaxed opacity-85">
              Evaltree Insights by Crowbar delivers concise, professionally crafted 3–5 page briefs
              simplifying AI, geopolitics, valuation, and global trends for fast understanding
              and decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section id="previews" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">Choose Your Briefs</h2>
          <p className="hidden text-sm opacity-70 md:block">Preview and purchase individual research briefs.</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {briefs.map((p) => {
            const alreadyPurchased =
              isLoggedIn && !purchasedLoading && purchasedSlugs.includes(p.slug);

            return (
              <div
                key={p.id}
                className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#F5F6F8]" />
                  <span className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
                    Preview
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm opacity-75">
                  View a short preview. Full PDF opens only after purchase.
                </p>

                <button
                  onClick={() => openPreview(p.slug, p.title)}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-4 py-2.5 font-semibold text-white transition-transform transition-colors duration-150 ease-out hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]"
                >
                  View Preview
                </button>

                {/* Buy per brief */}
                <button
                  onClick={() => checkoutSelected(p.slug)}
                  disabled={!isLoggedIn || purchasedLoading || alreadyPurchased}
                  className={[
                    "mt-3 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 font-semibold transition",
                    !isLoggedIn
                      ? "cursor-not-allowed bg-[#9aa0aa] text-white/90"
                      : purchasedLoading
                      ? "cursor-wait bg-[#0F1C3F]/50 text-white"
                      : alreadyPurchased
                      ? "cursor-not-allowed bg-[#0F1C3F]/70 text-white"
                      : "bg-[#0F1C3F] text-white hover:opacity-95",
                  ].join(" ")}
                >
                  {purchasedLoading
                    ? "Checking purchase…"
                    : alreadyPurchased
                    ? "Already purchased"
                    : "Buy this brief – $2.99"}
                </button>

                {alreadyPurchased && (
                  <p className="mt-2 text-xs opacity-70">
                    Already purchased by you. You can re-download from your purchase link / downloads page.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Preview Modal */}
      {previewOpen && previewSlug && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Preview modal"
        >
          <div className="absolute inset-0 bg-black/40" onClick={closePreview} />

          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#0F1C3F]/10 p-4">
              <div className="text-sm font-semibold">{previewTitle}</div>
              <button
                onClick={closePreview}
                className="rounded-xl border border-[#0F1C3F]/15 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-[#F5F6F8]"
              >
                Close
              </button>
            </div>

            <div className="relative">
              <iframe
                src={`/api/preview-download?slug=${encodeURIComponent(previewSlug)}`}
                className="h-[75vh] w-full"
                title="Preview PDF"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-2 px-4">
                <div className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
                  Preview ends here
                </div>
                <Link
                  href="/#pricing"
                  onClick={closePreview}
                  className="rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Go to Pricing to unlock full PDF
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-12 scroll-mt-24">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Pricing</h2>
          {!loading && !isLoggedIn && (
            <span className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
              Login required
            </span>
          )}
        </div>

        <div className="relative">
          <div className={isLoggedIn ? "" : "pointer-events-none select-none blur-[2px] opacity-70"}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="text-sm opacity-70">Single Brief — $2.99 USD</div>
                <div className="mt-2 text-2xl font-semibold">Single Brief</div>
                <div className="mt-2 text-3xl font-semibold">$2.99 USD</div>

                  <button
                  onClick={() => {document.getElementById("previews")?.scrollIntoView({ behavior: "smooth" });}}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white transition-transform transition-colors duration-150 ease-out hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]"
                >
                  Buy Single Brief – $2.99 USD
                </button>

                <p className="mt-2 text-xs opacity-70">
                  Prices shown are exclusive of VAT. VAT is not currently charged but may be applied if legally required.
                </p>

                <p className="mt-3 text-sm opacity-70">
                  Includes one research brief of your choice. Delivered instantly via Stripe email link.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="text-sm opacity-70">Five Briefs — $8.99 USD</div>
                <div className="mt-2 text-2xl font-semibold">Five Briefs</div>
                <div className="mt-2 text-3xl font-semibold">$8.99 USD</div>

                <button
                  onClick={() => packEnabled && startCheckout("pack")}
                  disabled={!packEnabled}
                  className={[
                    "mt-6 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold transition-transform transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]",
                    packEnabled
                      ? "bg-[#FF6A00] text-white hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px]"
                      : "cursor-not-allowed bg-[#9aa0aa] text-white/90",
                  ].join(" ")}
                >
                  Buy Five Briefs – $8.99 USD
                </button>

                <p className="mt-2 text-xs opacity-70">
                  Prices shown are exclusive of VAT. VAT is not currently charged but may be applied if legally required.
                </p>

                <p className="mt-3 text-sm opacity-70">
                  Includes Five Briefs. Delivered instantly via Stripe email link.
                </p>

                {!packEnabled && (
                  <p className="mt-3 text-sm opacity-70">
                    The 5-brief bundle will be enabled when 5 briefs are available.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[#0F1C3F]/10 bg-white p-6 shadow-sm">
              <div>
                <div className="text-sm font-semibold flex items-start justify-between">
                  <h3>Important information</h3>
                  <span className="shrink-0 rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
                    Not advice
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  Evaltree Insights are informational research briefs only and do not constitute legal, financial, or investment advice.
                  Please read the{" "}
                  <Link href="/evaltree/terms" className="font-medium underline underline-offset-4">
                    Terms of Use / Terms of Purchase
                  </Link>{" "}
                  before buying.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
                <div className="text-sm font-semibold">Payments & delivery</div>

                <p className="mt-2 text-xs opacity-70">
                  Prices shown are exclusive of VAT. VAT is not currently charged but may be applied if legally required.
                </p>

                <ul className="mt-2 space-y-2 text-sm opacity-80">
                  <li>Payments processed securely by Crowbar Ltd.</li>
                  <li>Transactions are handled by Stripe and delivered instantly upon payment.</li>
                  <li>All purchases are non-refundable due to the digital nature of the product.</li>
                </ul>
              </div>
            </div>
          </div>

          {!loading && !isLoggedIn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mx-auto max-w-md rounded-3xl border border-[#0F1C3F]/10 bg-white p-6 text-center shadow-sm">
                <div className="text-base font-semibold">Login to purchase</div>
                <p className="mt-2 text-sm opacity-80">
                  Please log in with your Crowbar account to unlock pricing and complete checkout.
                </p>
                <button
                  onClick={signInWithCrowbar}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                >
                  Continue with Crowbar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
