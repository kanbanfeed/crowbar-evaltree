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

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Terms of Use &amp; Terms of Purchase
          </h1>
          <p className="mt-2 text-sm opacity-70">
            Evaltree Insights by Crowbar • Last updated: 10/12/2025
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed opacity-85">
            <p>
              Welcome to Evaltree Insights by Crowbar, a product of Crowbar Ltd. By accessing or purchasing from this page,
              you agree to these Terms of Use and Terms of Purchase. Please read them carefully before completing any transaction.
            </p>

            <div className="rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
              <p className="font-medium">Operator Details</p>
              <p className="mt-2">
                Crowbar Ltd <br />
                Registered in the United Kingdom <br />
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

            <h2 className="text-base font-semibold opacity-100">1. Introduction</h2>
            <p>
              This website provides access to short-form digital research briefs (“Evaltree Insights”). These Terms govern your
              use of the site and your purchase of any brief or brief bundle.
            </p>

            <h2 className="text-base font-semibold opacity-100">2. Digital Product Purchases</h2>
            <p>By purchasing an Evaltree Insight, you acknowledge and agree that:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are purchasing a digital-only product.</li>
              <li>Delivery occurs instantly via Stripe email link after successful payment.</li>
              <li>You are responsible for providing a valid and accessible email address.</li>
              <li>You must download and store your purchased brief(s), as download links may expire.</li>
            </ul>
            <p>This complies with UK digital goods supply regulations.</p>

            <h2 className="text-base font-semibold opacity-100">3. No Refund Policy (Digital Goods)</h2>
            <p className="font-medium">All purchases are non-refundable.</p>
            <p>Because the product is delivered instantly, you agree that:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You lose your right to cancel under consumer law once the download link is provided.</li>
              <li>Refunds, cancellations, or exchanges cannot be offered after delivery.</li>
            </ul>
            <p>This complies with the UK Consumer Contracts Regulations for instant-access digital products.</p>

            <h2 className="text-base font-semibold opacity-100">4. License &amp; Usage Rights</h2>
            <p>
              Purchasing a brief grants you a personal, non-transferable, non-exclusive license to view the content.
            </p>
            <p>You may not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Copy, reproduce, or redistribute the brief</li>
              <li>Publish or share it online</li>
              <li>Sell, sublicense, or modify any part of it</li>
              <li>Use it for commercial, competitive, or academic resale purposes</li>
            </ul>
            <p>All content remains the intellectual property of Crowbar Ltd.</p>

            <h2 className="text-base font-semibold opacity-100">5. Payment Processing</h2>
            <p>
              Payments are processed securely through Stripe, a PCI-compliant payment processor. Crowbar Ltd does not store or
              access your full payment details and is not responsible for Stripe-related technical issues. By completing a
              transaction, you accept Stripe’s payment terms and privacy policies.
            </p>

            <h2 className="text-base font-semibold opacity-100">6. Pricing</h2>
            <p>Pricing is displayed clearly:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Single Brief — $2.99</li>
              <li>Five Briefs — $8.99</li>
            </ul>
            <p>Crowbar Ltd may update pricing at any time, but changes will not affect already-completed purchases.</p>

            <h2 className="text-base font-semibold opacity-100">7. Delivery &amp; Access to Purchased Content</h2>
            <p>
              After successful payment, you will receive an email containing your download link. Crowbar Ltd is not responsible
              for failed access if an incorrect email address is provided, emails are blocked/filtered, or you fail to download
              the product before link expiration.
            </p>
            <p>
              For assistance, contact{" "}
              <a className="underline underline-offset-4" href="mailto:support@crowbarltd.com">
                support@crowbarltd.com
              </a>
              .
            </p>

            <h2 className="text-base font-semibold opacity-100">8. Intellectual Property Rights</h2>
            <p>
              All Evaltree Insights, PDFs, designs, branding, and written content are owned by Crowbar Ltd and protected by
              copyright and IP laws. Unauthorized use, duplication, distribution, or public sharing is strictly prohibited.
            </p>

            <h2 className="text-base font-semibold opacity-100">9. Limited Liability</h2>
            <p>To the extent permitted by law:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Evaltree briefs are informational only and must not be considered legal, financial, or investment advice.</li>
              <li>Crowbar Ltd is not liable for decisions made based on the content.</li>
              <li>
                Crowbar Ltd is not responsible for indirect, incidental, or consequential damages resulting from use of the site
                or products.
              </li>
            </ul>

            <h2 className="text-base font-semibold opacity-100">10. Amendments to Terms</h2>
            <p>
              Crowbar Ltd may update these Terms at any time. Any changes will be posted with an updated <b>Last Updated </b> date.
              Continued use of the site constitutes acceptance of the revised Terms.
            </p>

            <h2 className="text-base font-semibold opacity-100">11. Contact Information</h2>
            <p>
              For support or inquiries:{" "}
              <a className="underline underline-offset-4" href="mailto:support@crowbarltd.com">
                support@crowbarltd.com
              </a>
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
