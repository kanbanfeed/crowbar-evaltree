// app/evaltree/privacy/page.tsx

import { CROWBAR_REGISTERED_ADDRESS } from "../_legal";
export const metadata = {
  title: "Privacy Policy — Evaltree Insights by Crowbar",
  description:
    "Privacy Policy for Evaltree Insights by Crowbar (Crowbar Ltd). Learn what data we collect and how we use it.",
};

export default function PrivacyPolicyPage() {
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
          <h1 className="text-2xl font-semibold md:text-3xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm opacity-70">
            Evaltree Insights by Crowbar (Crowbar Ltd) • Last updated: 2025
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed opacity-85">
            <p>
              This Privacy Policy explains how Crowbar Ltd (“we”, “us”) collects,
              uses, and protects your information when you use or purchase from
              Evaltree Insights by Crowbar.
            </p>

            <div className="rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
              <p className="font-medium">Operator Details</p>
              <p className="mt-2">
                Crowbar Ltd (United Kingdom) <br />
                Contact:{" "}
                <a className="underline underline-offset-4" href="mailto:support@crowbarltd.com">
                  support@crowbarltd.com
                </a>
                <br />
                <div className="mt-2 text-sm opacity-75">
                Registered address:
                <div className="mt-1 whitespace-pre-line">
                  {CROWBAR_REGISTERED_ADDRESS}
                </div>
              </div>
              </p>
            </div>

            <h2 className="text-base font-semibold opacity-100">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Purchase & contact data:</span> your email address and
                purchase confirmation details required to deliver digital briefs.
              </li>
              <li>
                <span className="font-medium">Payment processing data:</span> payments are processed by
                Stripe. We do not store your full card details.
              </li>
              <li>
                <span className="font-medium">Usage/analytics (if enabled):</span> we may use analytics
                tools (e.g., Vercel Analytics or Google Analytics) to understand site usage.
              </li>
            </ul>

            <h2 className="text-base font-semibold opacity-100">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To deliver purchased digital briefs and provide customer support.</li>
              <li>To prevent fraud and secure transactions.</li>
              <li>To improve site performance and user experience (if analytics are enabled).</li>
            </ul>

            <h2 className="text-base font-semibold opacity-100">3. Payments & Stripe</h2>
            <p>
              Transactions are handled by Stripe and delivered instantly upon payment. Stripe may
              process personal data in accordance with Stripe’s privacy policy.
            </p>

            <h2 className="text-base font-semibold opacity-100">4. Cookies</h2>
            <p>
              We may use cookies and similar technologies. If analytics are enabled, a cookie
              banner will request your consent. See our{" "}
              <a className="underline underline-offset-4" href="/evaltree/cookies">
                Cookie Policy
              </a>
              .
            </p>

            <h2 className="text-base font-semibold opacity-100">5. Data Retention</h2>
            <p>
              We retain customer and purchase records only as long as necessary for delivery,
              support, legal obligations, and legitimate business purposes.
            </p>

            <h2 className="text-base font-semibold opacity-100">6. Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal data where applicable.
              Contact{" "}
              <a className="underline underline-offset-4" href="mailto:support@crowbarltd.com">
                support@crowbarltd.com
              </a>
              .
            </p>

            <h2 className="text-base font-semibold opacity-100">7. Contact</h2>
            <p>
              For privacy questions, email{" "}
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
