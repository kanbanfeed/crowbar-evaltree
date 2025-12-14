"use client";

import { useEffect, useState } from "react";



type Brief = {
  id: string;
  title: string;
  slug: string;
  preview_url: string;
};

export default function EvaltreeLanding() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [count, setCount] = useState<number>(0);

  const packEnabled = count >= 5;

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

  async function startCheckout(plan: "single" | "pack") {
    const r = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const d = await r.json();
    if (d.url) window.location.href = d.url;
    else alert(d.error || "Checkout failed");
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* Primary CTA */}
            <button
              onClick={() => startCheckout("single")}
              className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white shadow-sm transition-transform transition-colors duration-150 ease-out hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]"
            >
              Buy Single Brief – $2.99 USD
            </button>

            {/* Secondary CTA (grey out until 5 briefs) */}
            <button
              onClick={() => packEnabled && startCheckout("pack")}
              disabled={!packEnabled}
              className={[
                "inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold transition-transform transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]",
                packEnabled
                  ? "border-[#FF6A00] bg-white text-[#0F1C3F] hover:bg-[#FF6A00] hover:text-white hover:shadow-md active:bg-[#e65f00] active:text-white active:scale-95 active:translate-y-[1px]"
                  : "cursor-not-allowed border-[#0F1C3F]/20 bg-[#F5F6F8] text-[#0F1C3F]/50",
              ].join(" ")}
            >
              Buy Five Briefs – $8.99 USD
            </button>
          </div>

          {!packEnabled && (
            <p className="mt-4 text-sm opacity-70">
              If there are only 3 briefs, then let us grey out the 5 brief option until 2 more and more of them are added.
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
          <h2 className="text-xl font-semibold">Preview Briefs</h2>
          <p className="hidden text-sm opacity-70 md:block">Free previews.</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {briefs.map((p) => (
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

              {/* Keeping your UI; copyLine removed because DB doesn’t have it */}
              <p className="mt-2 text-sm opacity-75">
                Download a free preview.
              </p>

              <a
                href={`/api/preview-download?slug=${encodeURIComponent(p.slug)}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-4 py-2.5 font-semibold text-white transition-transform transition-colors duration-150 ease-out hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]"
              >
                Download Free Preview
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-12 scroll-mt-24">
        <h2 className="mb-4 text-xl font-semibold">Pricing</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-sm opacity-70">Single Brief — $2.99 USD</div>
            <div className="mt-2 text-2xl font-semibold">Single Brief</div>
            <div className="mt-2 text-3xl font-semibold">$2.99 USD</div>

            <button
              onClick={() => startCheckout("single")}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white transition-transform transition-colors duration-150 ease-out hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]"
            >
              Buy Single Brief – $2.99 USD
            </button>

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
          <div >
            <div>
              <div className="text-sm font-semibold flex items-start justify-between">
                <h3>Important information</h3>
                <span className="shrink-0 rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
              Not advice
            </span></div>
              <p className="mt-2 text-sm leading-relaxed opacity-80">
                Evaltree Insights are informational research briefs only and do not constitute legal, financial, or investment advice.
                Please read the{" "}
                <a href="/evaltree/terms" className="font-medium underline underline-offset-4">
                  Terms of Use / Terms of Purchase
                </a>{" "}
                before buying.
              </p>
            </div>

            
          </div>

          <div className="mt-5 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
            <div className="text-sm font-semibold">Payments & delivery</div>
            <ul className="mt-2 space-y-2 text-sm opacity-80">
              <li>Payments processed securely by Crowbar Ltd.</li>
              <li>Transactions are handled by Stripe and delivered instantly upon payment.</li>
              <li>All purchases are non-refundable due to the digital nature of the product.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
