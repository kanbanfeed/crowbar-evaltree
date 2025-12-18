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
              Welcome to Evaltree Insights by Crowbar, a product of Crowbar Ltd. By accessing this website or purchasing any Evaltree Insight, you agree to these Terms of Use and Terms of Purchase. 
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
              
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li> Digital-only products.</li>
                <li>Delivery occurs via instant email link after payment.</li>
                <li>Instant delivery via email link. </li>
                <li>You must provide a valid email address</li>
                <li>Download links may expire; store your file promptly. </li>
                <li>All digital content provided by Evaltree Insights is licensed, not sold.</li>
              </ul>
            </section>

            {/* 5. Consent to Immediate Access */}
            <section>
              <h2 className="text-base font-semibold">
                5. Consent to Immediate Access &amp; Loss of Cancellation Rights
              </h2>
              <p className="mt-2">
                By purchasing, you:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>request immediate access to the digital product,</li>
                <li>acknowledge instant delivery, and</li>
                <li>provide explicit consent to lose your right to cancel once the download link is issued. </li>
              </ul>
            </section>

            {/* 6. No Refund Policy */}
            <section>
              <h2 className="text-base font-semibold">
                6. No Refund Policy (Digital Goods)
              </h2>
              <p className="mt-2">
                All purchases are final once the digital link is delivered. Refunds cannot be offered for: 
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>incorrect email entry,</li>
                <li>failure to download before link expiration,</li>
                <li>dissatisfaction with the content, or</li>
                <li>technical issues on your device or network.</li>
                <li><b>No refunds once digital content is delivered and accessed.</b></li>
              </ul>
            </section>

            {/* 7. License & Usage Rights */}
            <section>
              <h2 className="text-base font-semibold">
                7. License &amp; Usage Rights
              </h2>
              <p className="mt-2">
                Your purchase grants a personal, non-transferable, non-exclusive license. You may not: 
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>copy, reproduce, or redistribute</li>
                <li>publish or share online,</li>
                <li>resell or sublicense,</li>
                <li>scrape or mass-extract content. </li>
                <li>All digital content provided by Evaltree Insights is licensed, not sold.</li>
              </ul>
            </section>

            {/* 8. Payment Processing */}
            <section>
              <h2 className="text-base font-semibold">8. Payment Processing</h2>
              <p className="mt-2">
                Payments processed by Stripe. Crowbar Ltd does not store full card details.
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
                Pricing may change but not for past purchases. 
              </p>
              <p className="mt-2">
                All prices are exclusive of VAT. Crowbar Ventures Ltd is not currently VAT registered. VAT may be charged if required by law.
              </p>
            </section>

            {/* 10. Delivery & Access Responsibility */}
            <section>
              <h2 className="text-base font-semibold">
                10. Delivery &amp; Access Responsibility
              </h2>
              <p className="mt-2">
                You are responsible for:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li> checking spam/junk filters,</li>
                <li>providing correct contact details, </li>
                <li>ensuring your device supports downloads. </li>
              </ul>
              {/* <p className="mt-2">
                For assistance, Email:{" "}
                <a
                  className="underline underline-offset-4"
                  href="mailto:support@crowbarltd.com"
                >
                  support@crowbarltd.com
                </a>
                .
              </p> */}
            </section>

            {/* 11. Intellectual Property */}
            <section>
              <h2 className="text-base font-semibold">11. Intellectual Property</h2>
              <p className="mt-2">
                All content is owned by Crowbar Ltd. Unauthorized sharing or redistribution is prohibited.  
              </p>
            </section>

            {/* 12. Prohibited Use */}
            <section>
              <h2 className="text-base font-semibold">12. Prohibited Use</h2>
              <p className="mt-2">You may not: </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>scrape, automate, or bot-access the site, </li>
                <li>interfere with site functionality,</li>
                <li>replicate or reverse engineer the platform, </li>
                <li>use products illegally.</li>
              </ul>
            </section>

            {/* 13. No Warranties */}
            <section>
              <h2 className="text-base font-semibold">
                13. No Warranties / Informational Use Only
              </h2>
              <p className="mt-2">
               Content is informational only, not legal, financial, or investment advice. Accuracy is not guaranteed. 
              </p>
            </section>

            {/* 14. Limited Liability */}
            <section>
              <h2 className="text-base font-semibold">14. Limited Liability</h2>
              <p className="mt-2">
                Crowbar Ltd is not liable for indirect or consequential damages. Liability is limited to the purchase amount. 
              </p>
            </section>

            {/* 15. Technical Requirements */}
            <section>
              <h2 className="text-base font-semibold">15. Technical Requirements</h2>
              <p className="mt-2">
                You are responsible for internet access, device compatibility, and PDF-reading capability. 
              </p>
              
            </section>

            {/* 16. Amendments */}
            <section>
              <h2 className="text-base font-semibold">
                16. Amendments to These Terms
              </h2>
              <p className="mt-2">
                Terms may be updated at any time. Continued use signifies acceptance. 
              </p>
            </section>

            {/* 17. Governing Law */}
            <section>
              <h2 className="text-base font-semibold">
                17. Governing Law &amp; Jurisdiction
              </h2>
              <p className="mt-2">
                These Terms are governed by the laws of <b>England and Wales </b>, and any
                disputes will be resolved exclusively in the courts of England
                and Wales.
              </p>
              <p className="mt-2 text-sm opacity-85">
                However, users may also be entitled to the protections of <b> mandatory consumer and data-protection laws in their country of residence, </b> where applicable. 
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
