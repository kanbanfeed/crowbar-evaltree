
const pdfs = [
  { title: "AI Safety 2025", href: "/evaltree/pdfs/ai-safety-2025-preview.pdf" },
  { title: "Startup Valuation 2025", href: "/evaltree/pdfs/startup-valuation-2025-preview.pdf" },
  { title: "Geopolitics 2025", href: "/evaltree/pdfs/geopolitics-2025-preview.pdf" },
];



// ✅ Add official registered address here (required in footer for compliance)

export const metadata = {
  title: "Evaltree Insights by Crowbar — 5-Minute Expert Briefs",
  description:
    "Instant-access expert briefs. Download your purchased brief securely after payment.",
};


export default function DownloadSingle() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      {/* Header */}
      <header >
        <div className=" flex w-full items-center justify-end gap-4 px-6 py-4">

          <div className="flex items-center gap-3">
            <a
              href="/evaltree"
              className="rounded-xl border border-[#ff6a00] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#ff6a00] hover:text-white  "
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
            Download your Evaltree Insights by Crowbar brief(s) below:
          </p>

          {/* Instruction */}
          <div className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
            <p className="text-sm font-medium">
              If you purchased the Single Brief, please download any one brief.
            </p>
            <p className="mt-2 text-sm opacity-80">
              If you meant to purchase Five Briefs, return to the landing page to choose the correct option.
            </p>
          </div>

          {/* ✅ Compliance disclaimers */}
          <div className="mt-4 text-xs opacity-70">
            <div>Payments processed securely by Crowbar Ltd.</div>
            <div>Transactions are handled by Stripe and delivered instantly upon payment.</div>
            <div>All purchases are non-refundable due to the digital nature of the product.</div>
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
                  download={`${p.title.replace(/\s+/g, "-").toLowerCase()}-preview.pdf`}
                  rel="noreferrer"
                >
                  Download PDF
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

    </main>
  );
}
