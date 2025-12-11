// app/evaltree/terms/page.tsx

import { CROWBAR_REGISTERED_ADDRESS } from "../_legal";

export const metadata = {
  title: "Terms of Use & Terms of Purchase — Evaltree Insights by Crowbar",
  description:
    "Terms of Use and Terms of Purchase for Evaltree Insights by Crowbar (Crowbar Ltd).",
};

export default function TermsPage() {
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
            Terms of Use &amp; Terms of Purchase
          </h1>
          <p className="mt-2 text-sm opacity-70">
            Evaltree Insights by Crowbar • Last Updated: 11/12/2025
          </p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed opacity-90">
            <p>
              Welcome to Evaltree Insights by Crowbar, a product of Crowbar Ltd.
              By accessing this website or purchasing any Evaltree Insight, you
              agree to these Terms of Use and Terms of Purchase. Please read
              them carefully before completing any transaction.
            </p>

            {/* Operator Details */}
            <section className="rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
              <h2 className="font-semibold">1. Operator Details</h2>
              <p className="mt-3">
                Crowbar Ltd <br />
                Registered in the United Kingdom
              </p>
              <p className="mt-3">
                Email:{" "}
                <a
                  className="underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
              </p>
              <div className="mt-3 text-sm opacity-80">
                Registered address:
                <div className="mt-1 whitespace-pre-line">
                  {CROWBAR_REGISTERED_ADDRESS || `Crowbar Ventures Limited
71–75 Shelton Street
Covent Garden
London
WC2H 9JQ
United Kingdom`}
                </div>
              </div>
            </section>

            {/* 2. Eligibility */}
            <section>
              <h2 className="text-base font-semibold">2. Eligibility</h2>
              <p className="mt-2">
                You must be 18 years or older to purchase or access digital
                products on this website.
              </p>
            </section>

            {/* 3. Introduction */}
            <section>
              <h2 className="text-base font-semibold">3. Introduction</h2>
              <p className="mt-2">
                Evaltree Insights provides digital research briefs. These Terms
                govern your use of the site and your purchase of any digital
                brief or bundle.
              </p>
            </section>

            {/* 4. Digital Product Purchases */}
            <section>
              <h2 className="text-base font-semibold">
                4. Digital Product Purchases
              </h2>
              <p className="mt-2">
                By purchasing an Evaltree Insight, you acknowledge and agree
                that:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>All products are digital-only.</li>
                <li>Delivery occurs via instant email link after payment.</li>
                <li>You are responsible for providing a valid email address.</li>
                <li>
                  Download links may expire, so you should store your files
                  promptly.
                </li>
              </ul>
            </section>

            {/* 5. Consent to Immediate Access */}
            <section>
              <h2 className="text-base font-semibold">
                5. Consent to Immediate Access &amp; Loss of Cancellation Rights
              </h2>
              <p className="mt-2">
                By purchasing, you expressly:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>request immediate access to the digital product,</li>
                <li>acknowledge that delivery is instant once paid, and</li>
                <li>
                  consent to losing your right to cancel once the download link
                  is issued.
                </li>
              </ul>
            </section>

            {/* 6. No Refund Policy */}
            <section>
              <h2 className="text-base font-semibold">
                6. No Refund Policy (Digital Goods)
              </h2>
              <p className="mt-2">
                All purchases are final once the digital link is delivered.
                Refunds cannot be offered for:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>incorrect email entry,</li>
                <li>failure to download before link expiration,</li>
                <li>dissatisfaction with the content, or</li>
                <li>technical issues on your device or network.</li>
              </ul>
            </section>

            {/* 7. License & Usage Rights */}
            <section>
              <h2 className="text-base font-semibold">
                7. License &amp; Usage Rights
              </h2>
              <p className="mt-2">
                Your purchase grants you a personal, non-transferable,
                non-exclusive license to access and read the purchased brief.
                You may not:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>copy, reproduce, or redistribute the content,</li>
                <li>publish or share it online,</li>
                <li>resell, sublicense, or commercially exploit it, or</li>
                <li>scrape or mass-extract any content from the product.</li>
              </ul>
            </section>

            {/* 8. Payment Processing */}
            <section>
              <h2 className="text-base font-semibold">8. Payment Processing</h2>
              <p className="mt-2">
                Payments are processed by Stripe. Crowbar Ltd does not store,
                process, or have access to your full card details. By completing
                a purchase, you also accept Stripe&apos;s terms and privacy
                policy.
              </p>
            </section>

            {/* 9. Pricing */}
            <section>
              <h2 className="text-base font-semibold">9. Pricing</h2>
              <p className="mt-2">Current pricing is as follows:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Single Brief — $2.99</li>
                <li>Five Briefs — $8.99</li>
              </ul>
              <p className="mt-2">
                Pricing may change at any time, but changes will not affect
                purchases that have already been completed.
              </p>
            </section>

            {/* 10. Delivery & Access Responsibility */}
            <section>
              <h2 className="text-base font-semibold">
                10. Delivery &amp; Access Responsibility
              </h2>
              <p className="mt-2">
                After successful payment, you will receive an email containing
                your download link. You are responsible for:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>checking spam and junk folders,</li>
                <li>providing correct contact details, and</li>
                <li>ensuring your device can open and store PDF files.</li>
              </ul>
              <p className="mt-2">
                For assistance, email{" "}
                <a
                  className="underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
                .
              </p>
            </section>

            {/* 11. Intellectual Property */}
            <section>
              <h2 className="text-base font-semibold">11. Intellectual Property</h2>
              <p className="mt-2">
                All Evaltree Insights content, PDFs, designs, branding, and
                written material are owned by Crowbar Ltd and protected by
                copyright and other intellectual property laws. Unauthorized
                sharing, reproduction, or redistribution is strictly prohibited.
              </p>
            </section>

            {/* 12. Prohibited Use */}
            <section>
              <h2 className="text-base font-semibold">12. Prohibited Use</h2>
              <p className="mt-2">You agree not to:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>scrape, automate, or bot-access the site,</li>
                <li>interfere with site functionality or security,</li>
                <li>replicate or reverse engineer the platform, or</li>
                <li>use any product for unlawful purposes.</li>
              </ul>
            </section>

            {/* 13. No Warranties */}
            <section>
              <h2 className="text-base font-semibold">
                13. No Warranties / Informational Use Only
              </h2>
              <p className="mt-2">
                Evaltree Insights are provided for informational purposes only
                and do not constitute legal, financial, investment, or other
                professional advice. While we aim for accuracy, we do not
                guarantee that the content is complete, up to date, or suitable
                for your specific situation.
              </p>
            </section>

            {/* 14. Limited Liability */}
            <section>
              <h2 className="text-base font-semibold">14. Limited Liability</h2>
              <p className="mt-2">
                To the maximum extent permitted by law, Crowbar Ltd shall not be
                liable for any indirect, incidental, or consequential losses
                arising from the use of this website or its products. In any
                event, our total liability is limited to the amount you paid for
                the relevant purchase.
              </p>
            </section>

            {/* 15. Technical Requirements */}
            <section>
              <h2 className="text-base font-semibold">15. Technical Requirements</h2>
              <p className="mt-2">
                You are responsible for maintaining:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>internet access,</li>
                <li>a compatible device, and</li>
                <li>software capable of opening PDF or similar files.</li>
              </ul>
            </section>

            {/* 16. Amendments */}
            <section>
              <h2 className="text-base font-semibold">
                16. Amendments to These Terms
              </h2>
              <p className="mt-2">
                Crowbar Ltd may update these Terms at any time. The “Last
                Updated” date above will reflect the latest version. Continued
                use of the website after changes are published constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            {/* 17. Governing Law */}
            <section>
              <h2 className="text-base font-semibold">
                17. Governing Law &amp; Jurisdiction
              </h2>
              <p className="mt-2">
                These Terms are governed by the laws of England and Wales. Any
                disputes will be resolved exclusively in the courts of England
                and Wales.
              </p>
              <p className="mt-2 text-sm opacity-85">
                However, users may also benefit from the protections of
                mandatory consumer and data-protection laws in their country of
                residence, where applicable.
              </p>
            </section>

            {/* 18. Contact */}
            <section>
              <h2 className="text-base font-semibold">18. Contact Information</h2>
              <p className="mt-2">
                For support or questions regarding these Terms, contact:
              </p>
              <p className="mt-2">
                Email:{" "}
                <a
                  className="underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
                <br />
                Crowbar Ventures Limited
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
