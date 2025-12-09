const pdfs = [
  { title: "AI Safety 2025", href: "/evaltree/pdfs/ai-safety-2025-preview.pdf" },
  { title: "Startup Valuation 2025", href: "/evaltree/pdfs/startup-valuation-2025-preview.pdf" },
  { title: "Geopolitics 2025", href: "/evaltree/pdfs/geopolitics-2025-preview.pdf" },
];

const STRIPE_SINGLE = "https://buy.stripe.com/dRm7sK8uLaA89lNcL77Vm0J";
// Replace this with your 5-brief Stripe link when you get it:
const STRIPE_PACK = "https://buy.stripe.com/bJe14mdP5eQo2Xp9yV7Vm0K";

const navItems = [
    { label: "Home", href: "#top" },

  { label: "About", href: "#about" },
  { label: "Previews", href: "#previews" },
  { label: "Pricing", href: "#pricing" },
];


export default function DownloadSingle() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      {/* Header */}
      <header className="border-b border-[#0F1C3F]/10 bg-white/85 backdrop-blur">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-4">
          <a href="/evaltree" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#0F1C3F]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight md:text-base">
                Evaltree Insights
              </div>
              <div className="text-xs opacity-70">by Crowbar</div>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/evaltree"
              className="rounded-xl border border-[#ff6a00] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#ff6a00] hover:text-white"
            >
              Back to landing
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F8] px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
            <span className="opacity-80">Purchase confirmed</span>
          </div>

          <h1 className="mt-5 text-2xl font-semibold md:text-3xl">
            Thank you for your purchase.
          </h1>

          <p className="mt-3 text-base opacity-80">
            Download your Evaltree Insights brief(s) below:
          </p>

          {/* Instruction */}
          <div className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
            <p className="text-sm font-medium">
              If you purchased the Single Brief, please download any one brief.
            </p>
            <p className="mt-2 text-sm opacity-80">
              If you meant to purchase the 5-Brief Pack, return to the landing page to choose the correct option.
            </p>
          </div>

          {/* List */}
          <ul className="mt-6 space-y-3">
            {pdfs.map((p) => (
              <li
                key={p.title}
                className="flex items-center justify-between gap-3 rounded-2xl bg-[#F5F6F8] p-4"
              >
                <span className="font-medium">{p.title}</span>
                <a
                  href={p.href}
                  className="rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF
                </a>
              </li>
            ))}
          </ul>

          {/* Support */}
          <div className="mt-8">
            <p className="text-sm opacity-80">
              For support, contact:{" "}
              <a
                className="font-medium underline underline-offset-4"
                href="mailto:support@crowbarltd.com"
              >
                support@crowbarltd.com
              </a>
            </p>
          </div>

          {/* Footer line */}
          <div className="mt-8 border-t border-[#0F1C3F]/10 pt-5 text-sm opacity-70">
            © Crowbar Ltd 2025. Evaltree Insights by Crowbar.
          </div>
        </div>
      </div>
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
