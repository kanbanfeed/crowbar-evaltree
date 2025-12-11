// app/evaltree/privacy/page.tsx

import { CROWBAR_REGISTERED_ADDRESS } from "../_legal";

export const metadata = {
  title: "Privacy Policy — Evaltree Insights by Crowbar",
  description:
    "Privacy Policy for Evaltree Insights by Crowbar (Crowbar Ltd). Learn how we collect, use, store, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      <header>
        <div className="flex w-full items-center justify-end gap-4 px-6 py-4">
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

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Privacy Policy
          </h1>

          <p className="mt-2 text-sm opacity-70">
            Evaltree Insights by Crowbar (Crowbar Ltd) • Last Updated: 11/12/2025
          </p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed opacity-90">
            <p>
              This Privacy Policy explains how Crowbar Ltd (“Crowbar”, “we”, “us”, “our”) 
              collects, uses, stores, and protects your personal information when you 
              access or purchase from Evaltree Insights by Crowbar.
            </p>

            {/* 1. Operator Details */}
            <section className="rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
              <h2 className="font-semibold">1. Operator Details</h2>

              <p className="mt-3">
                Crowbar Ltd (United Kingdom) <br />
                <strong>Registered Address:</strong>
                <div className="mt-1 whitespace-pre-line">
                  Crowbar Ventures Limited
                  {"\n"}71–75 Shelton Street
                  {"\n"}Covent Garden
                  {"\n"}London
                  {"\n"}WC2H 9JQ
                  {"\n"}United Kingdom
                </div>
              </p>

              <p className="mt-3">
                Contact:{" "}
                <a
                  className="underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
              </p>

              <p className="mt-3 text-sm opacity-80">
                Crowbar Ltd acts as the Data Controller for personal data processed 
                through this website.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="text-base font-semibold">2. Information We Collect</h2>

              <h3 className="mt-3 font-medium">A. Purchase & Contact Information</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email address</li>
                <li>Order details</li>
                <li>Purchase access details</li>
              </ul>

              <h3 className="mt-3 font-medium">B. Payment Information</h3>
              <p>
                Payments are processed securely by Stripe. We do not store, process, 
                or have access to your full card details.
              </p>

              <h3 className="mt-3 font-medium">C. Technical & Usage Data</h3>
              <p>Collected automatically when you use the website:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address (may be anonymized)</li>
                <li>Device and browser information</li>
                <li>Pages viewed and interactions (if analytics enabled)</li>
              </ul>

              <h3 className="mt-3 font-medium">D. Communications Data</h3>
              <p>Information you provide when contacting support.</p>

              <p className="mt-2 text-sm opacity-80">
                We do not intentionally collect sensitive personal data 
                (e.g., health, religion, biometric data).
              </p>
            </section>

            {/* 3. Legal Basis */}
            <section>
              <h2 className="text-base font-semibold">
                3. Legal Basis for Processing (GDPR Compliance)
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contractual Necessity</li>
                <li>Legitimate Interests (fraud prevention, security, UX improvement)</li>
                <li>Consent (analytics, marketing)</li>
                <li>Legal Obligation (tax, compliance)</li>
              </ul>
              <p className="mt-2 text-sm opacity-85">
                You may withdraw consent at any time.
              </p>
            </section>

            {/* 4. How We Use Data */}
            <section>
              <h2 className="text-base font-semibold">4. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Deliver digital briefs and provide access</li>
                <li>Customer support</li>
                <li>Secure payment processing</li>
                <li>Fraud prevention</li>
                <li>Analytics & performance (if consented)</li>
                <li>Legal compliance</li>
              </ul>
              <p className="mt-2 font-medium">We do not sell your personal information.</p>
            </section>

            {/* 5. Payments */}
            <section>
              <h2 className="text-base font-semibold">5. Payments & Stripe</h2>
              <p>
                Payments are handled by Stripe, a PCI-compliant provider. Stripe may 
                process transaction metadata, fraud-prevention data, and payment tokens. 
                Processing is subject to Stripe’s Privacy Policy.
              </p>
            </section>

            {/* 6. Cookies */}
            <section>
              <h2 className="text-base font-semibold">6. Cookies & Tracking</h2>
              <p>
                Cookies may be used for essential functionality, preferences, 
                security, and analytics (only with explicit consent).
              </p>
              <p className="mt-2">
                See our{" "}
                <a
                  className="underline underline-offset-4"
                  href="/evaltree/cookies"
                >
                  Cookie Policy
                </a>{" "}
                for more details.
              </p>
            </section>

            {/* 7. Retention */}
            <section>
              <h2 className="text-base font-semibold">7. Data Retention</h2>
              <p>Data is retained only for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Service delivery</li>
                <li>Customer support</li>
                <li>Legal and regulatory requirements</li>
                <li>Fraud prevention</li>
                <li>Business continuity</li>
              </ul>
            </section>

            {/* 8. Data Sharing */}
            <section>
              <h2 className="text-base font-semibold">8. Data Sharing</h2>
              <p>We may share limited data with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Stripe (payments)</li>
                <li>Hosting providers (e.g., Vercel)</li>
                <li>Analytics providers (if consented)</li>
                <li>Legal authorities when required</li>
              </ul>
            </section>

            {/* 9. International Transfers */}
            <section>
              <h2 className="text-base font-semibold">
                9. International Data Transfers
              </h2>
              <p>We rely on frameworks such as:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>SCCs (Standard Contractual Clauses)</li>
                <li>UK Addendum</li>
                <li>Adequacy decisions</li>
              </ul>
            </section>

            {/* 10. Data Security */}
            <section>
              <h2 className="text-base font-semibold">10. Data Security</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encryption</li>
                <li>Secure hosting</li>
                <li>Restricted access</li>
                <li>Monitoring & fraud protection</li>
              </ul>
            </section>

            {/* 11. Rights */}
            <section>
              <h2 className="text-base font-semibold">11. Your Rights</h2>

              <p>Depending on your region (GDPR, UK GDPR, DPDP), you may:</p>

              <ul className="list-disc pl-5 space-y-1">
                <li>Access your data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent</li>
                <li>Restrict processing</li>
                <li>Object to processing</li>
                <li>Request data portability</li>
                <li>File a complaint</li>
              </ul>

              <p className="mt-2">
                Email:{" "}
                <a
                  className="underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
              </p>
            </section>

            {/* 12. Children's Privacy */}
            <section>
              <h2 className="text-base font-semibold">12. Children’s Privacy</h2>
              <p>
                Evaltree Insights is not intended for children under the digital 
                consent age of their jurisdiction (typically 13–16).
              </p>
            </section>

            {/* 13. Automated Decision Making */}
            <section>
              <h2 className="text-base font-semibold">
                13. Automated Decision-Making
              </h2>
              <p>
                We do not use automated decision-making that has legal or significant 
                effects on users.
              </p>
            </section>

            {/* 14. Changes */}
            <section>
              <h2 className="text-base font-semibold">14. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. The “Last Updated” 
                date reflects the latest version.
              </p>
            </section>

            {/* 15. Contact */}
            <section>
              <h2 className="text-base font-semibold">15. Contact</h2>
              <p>
                For privacy questions or rights requests:
              </p>
              <p className="mt-2">
                📧{" "}
                <a
                  className="underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
                <br />
                📍 Crowbar Ventures Limited
                <br />
                71–75 Shelton Street
                <br />
                Covent Garden
                <br />
                London, WC2H 9JQ
                <br />
                United Kingdom
              </p>
            </section>

            <div className="mt-8 border-t border-[#0F1C3F]/10 pt-5 text-xs opacity-70">
              Payments processed securely by Crowbar Ltd.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
