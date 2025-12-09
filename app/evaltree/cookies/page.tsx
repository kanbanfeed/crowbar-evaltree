// app/evaltree/cookies/page.tsx

export const metadata = {
  title: "Cookie Policy — Evaltree Insights by Crowbar",
  description:
    "Cookie Policy for Evaltree Insights by Crowbar. Learn what cookies are used and how to manage preferences.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
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

          <a
            href="/evaltree"
            className="rounded-xl border border-[#ff6a00] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#ff6a00] hover:text-white"
          >
            Back to landing
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <h1 className="text-2xl font-semibold md:text-3xl">Cookie Policy</h1>
          <p className="mt-2 text-sm opacity-70">
            Evaltree Insights by Crowbar • Last updated: 2025
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed opacity-85">
            <p>
              This Cookie Policy explains how cookies and similar technologies may be used on
              Evaltree Insights by Crowbar.
            </p>

            <h2 className="text-base font-semibold opacity-100">1. What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device. They help websites work properly,
              remember preferences, and (if enabled) measure usage.
            </p>

            <h2 className="text-base font-semibold opacity-100">2. Cookies we may use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Essential cookies:</span> needed for the site to function.
              </li>
              <li>
                <span className="font-medium">Analytics cookies (optional):</span> used only if enabled and
                accepted (e.g., Vercel Analytics / Google Analytics).
              </li>
            </ul>

            <h2 className="text-base font-semibold opacity-100">3. Managing preferences</h2>
            <p>
              If a cookie banner is shown, you can accept or decline analytics cookies. You can also manage
              cookies through your browser settings.
            </p>

            <h2 className="text-base font-semibold opacity-100">4. Contact</h2>
            <p>
              Questions? Email{" "}
              <a className="underline underline-offset-4" href="mailto:support@crowbarltd.com">
                support@crowbarltd.com
              </a>
              .
            </p>

            <div className="mt-8 border-t border-[#0F1C3F]/10 pt-5 text-xs opacity-70">
              Payments processed securely by Crowbar Ltd.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
