const STRIPE_SINGLE = "https://buy.stripe.com/dRm7sK8uLaA89lNcL77Vm0J";
const STRIPE_PACK = "https://buy.stripe.com/bJe14mdP5eQo2Xp9yV7Vm0K";

// ✅ Add official registered address here (required in footer for compliance)
export const metadata = {
  title: "Evaltree Insights by Crowbar — 5-Minute Expert Briefs",
  description:
    "Concise 3–5 page expert briefs. Buy one brief or unlock the full bundle with instant delivery after payment.",
};

const previews = [
  {
    title: "AI Safety 2025",
    copyLine:
      "A practical overview of the biggest AI safety risks, governance moves, and what to watch next.",
    href: "/evaltree/pdfs/ai-safety-2025-preview.pdf",
  },
  {
    title: "Startup Valuation 2025",
    copyLine:
      "A fast guide to modern valuation methods, key drivers, and market benchmarks for 2025.",
    href: "/evaltree/pdfs/startup-valuation-2025-preview.pdf",
  },
  {
    title: "Geopolitics 2025",
    copyLine:
      "A concise brief on global power shifts, regional flashpoints, and implications for business.",
    href: "/evaltree/pdfs/geopolitics-2025-preview.pdf",
  },
];

export default function EvaltreeLanding() {
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
            <a
              href={STRIPE_SINGLE}
              className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white shadow-sm hover:opacity-95"
            >
              Buy Single Brief – $2.99 USD
            </a>

            <a
              href={STRIPE_PACK}
              className="inline-flex items-center justify-center rounded-xl border border-[#0F1C3F]/15 bg-white px-6 py-3 font-semibold text-[#0F1C3F] hover:bg-[#F5F6F8]"
            >
              Buy All Briefs – $8.99 USD
            </a>
          </div>

          {/* ✅ Removed repeated payment/Stripe disclaimer from hero as per guidance */}
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
          <p className="hidden text-sm opacity-70 md:block">Free previews (placeholder PDFs).</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {previews.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#F5F6F8]" />
                <span className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
                  Preview
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm opacity-75">{p.copyLine}</p>

              <a
                href={p.href}
                download={`${p.title.replace(/\s+/g, "-").toLowerCase()}-preview.pdf`}
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-4 py-2.5 font-semibold text-white hover:opacity-95"
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

            <a
              href={STRIPE_SINGLE}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white hover:opacity-95"
            >
              Buy Single Brief – $2.99 USD
            </a>

            {/* ✅ Pricing transparency */}
            <p className="mt-3 text-sm opacity-70">
              Includes one research brief of your choice. Delivered instantly via Stripe email link.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-sm opacity-70">All Briefs — $8.99 USD</div>
            <div className="mt-2 text-2xl font-semibold">All Briefs</div>
            <div className="mt-2 text-3xl font-semibold">$8.99 USD</div>

            <a
              href={STRIPE_PACK}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white hover:opacity-95"
            >
              Buy All Briefs – $8.99 USD
            </a>

            {/* ✅ Pricing transparency */}
            <p className="mt-3 text-sm opacity-70">
              Includes all briefs. Delivered instantly via Stripe email link.
            </p>
          </div>
        </div>

       <div className="mt-6 rounded-3xl border border-[#0F1C3F]/10 bg-white p-6 shadow-sm">
  <div className="flex items-start justify-between gap-4">
    <div>
      <div className="text-sm font-semibold">Important information</div>
      <p className="mt-2 text-sm leading-relaxed opacity-80">
        Evaltree Insights are informational research briefs only and do not constitute legal, financial, or investment advice.
        Please read the{" "}
        <a
          href="/evaltree/terms"
          className="font-medium underline underline-offset-4"
        >
          Terms of Use / Terms of Purchase
        </a>{" "}
        before buying.
      </p>
    </div>

    <span className="shrink-0 rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
      Not advice
    </span>
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

        {/* ✅ Contact / Support micro-section */}
        {/* <div className="mt-6 rounded-3xl border border-[#0F1C3F]/10 bg-white p-6 shadow-sm">
  <div className="flex items-start justify-between gap-4">
    <div>
      <div className="text-sm font-semibold">Support</div>
      <p className="mt-2 text-sm opacity-80">
        Email us at{" "}
        <a
          className="font-medium underline underline-offset-4"
          href="mailto:support@crowbarltd.com"
        >
          support@crowbarltd.com
        </a>{" "}
        for purchase, access, or general enquiries.
      </p>
      <p className="mt-1 text-sm opacity-70">
        Typical response time: within 2 business days.
      </p>
    </div>

    <span className="shrink-0 rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
      Customer support
    </span>
  </div>
</div> */}
      </section>
    </main>
  );
}
