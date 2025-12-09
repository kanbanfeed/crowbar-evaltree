const STRIPE_SINGLE = "https://buy.stripe.com/dRm7sK8uLaA89lNcL77Vm0J";
// Replace this with your 5-brief Stripe link when you get it:
const STRIPE_PACK = "https://buy.stripe.com/bJe14mdP5eQo2Xp9yV7Vm0K";

/**
 * Replace these "copy" lines later with the final copy you will share.
 */
const previews = [
  {
    title: "AI Safety 2025",
    copyLine: "Placeholder copy line — add final one-liner here later.",
    href: "/evaltree/pdfs/ai-safety-2025-preview.pdf",
  },
  {
    title: "Startup Valuation 2025",
    copyLine: "Placeholder copy line — add final one-liner here later.",
    href: "/evaltree/pdfs/startup-valuation-2025-preview.pdf",
  },
  {
    title: "Geopolitics 2025",
    copyLine: "Placeholder copy line — add final one-liner here later.",
    href: "/evaltree/pdfs/geopolitics-2025-preview.pdf",
  },
];

const navItems = [
    { label: "Home", href: "#top" },

  { label: "About", href: "#about" },
  { label: "Previews", href: "#previews" },
  { label: "Pricing", href: "#pricing" },
];

export default function EvaltreeLanding() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#0F1C3F]/10 bg-white/85 backdrop-blur">
        <div className=" flex w-full items-center justify-between gap-4 px-6 py-4">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#0F1C3F]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight md:text-base">
                Evaltree
              </div>
              <div className="text-xs opacity-70">Insights by Crowbar</div>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium opacity-80 hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:support@crowbarltd.com"
              className="hidden text-sm font-medium opacity-80 hover:opacity-100 md:inline"
            >
              support@crowbarltd.com
            </a>

            <a
              href={STRIPE_SINGLE}
              className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Buy ($2.99)
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-3 md:hidden">
          <div className="flex gap-3 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full bg-[#F5F6F8] px-3 py-1.5 font-medium opacity-90"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

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
              Buy 1 Brief ($2.99)
            </a>

            <a
              href={STRIPE_PACK}
              className="inline-flex items-center justify-center rounded-xl border border-[#0F1C3F]/15 bg-white px-6 py-3 font-semibold text-[#0F1C3F] hover:bg-[#F5F6F8]"
            >
              Buy 5 Briefs ($8.99)
            </a>
          </div>

          <p className="mt-4 text-sm opacity-70">
            Payments handled by Stripe. PDFs delivered via download page after checkout.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-24">
        <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-3 md:p-10">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-2 text-sm opacity-70">
              Fast, clear, decision-ready.
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-base leading-relaxed opacity-85">
              Evaltree Insights delivers concise, professionally crafted 3–5 page briefs
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
          <p className="hidden text-sm opacity-70 md:block">
            Free previews (placeholder PDFs).
          </p>
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

              {/* Copy line placeholder (you'll replace later) */}
              <p className="mt-2 text-sm opacity-75">{p.copyLine}</p>

              <a
                href={p.href}
                target="_blank"
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
            <div className="text-sm opacity-70">Option A</div>
            <div className="mt-2 text-2xl font-semibold">Single Brief</div>
            <div className="mt-2 text-3xl font-semibold">$2.99</div>

            <a
              href={STRIPE_SINGLE}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white hover:opacity-95"
            >
              Buy Single Brief
            </a>

            <p className="mt-3 text-sm opacity-70">
              After checkout, you’ll be redirected to the download page.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-sm opacity-70">Option B</div>
            <div className="mt-2 text-2xl font-semibold">Pack of 5 Briefs</div>
            <div className="mt-2 text-3xl font-semibold">$8.99</div>

            <a
              href={STRIPE_PACK}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white hover:opacity-95"
            >
              Buy 5-Brief Pack
            </a>

            <p className="mt-3 text-sm opacity-70">
              After checkout, you’ll be redirected to the pack download page.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0F1C3F]/10 bg-white">
        <div className="w-full px-6 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#0F1C3F]" />
                <div>
                  <div className="font-semibold">Evaltree Insights</div>
                  <div className="text-sm opacity-70">by Crowbar Ltd</div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed opacity-75">
                Concise 3–5 page briefs on AI, geopolitics, valuation, and global trends —
                designed for fast understanding and better decisions.
              </p>
            </div>

            {/* Links */}
            <div className="md:justify-self-center">
              <div className="text-sm font-semibold">Explore</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="opacity-80 hover:opacity-100"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={STRIPE_SINGLE}
                  className="opacity-80 hover:opacity-100"
                >
                  Buy Single ($2.99)
                </a>
                <a
                  href={STRIPE_PACK}
                  className="opacity-80 hover:opacity-100"
                >
                  Buy Pack ($8.99)
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="md:justify-self-end">
              <div className="text-sm font-semibold">Contact</div>
              <div className="mt-3 text-sm opacity-80">
                Support:{" "}
                <a
                  className="font-medium underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
              </div>

              <div className="mt-3 text-sm opacity-70">
                Payments processed securely by Crowbar Ltd.
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-[#0F1C3F]/10 pt-6 text-sm opacity-70 md:flex-row md:items-center md:justify-between">
            <div>© Crowbar Ltd 2025. All rights reserved.</div>
            <a href="#top" className="font-medium opacity-80 hover:opacity-100">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
