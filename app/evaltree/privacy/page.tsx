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
                Payments are processed securely by Stripe.<br/> We do not store, process, 
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
              <p>We process personal data under the following lawful bases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contractual Necessity: delivering purchased digital products. </li>
                <li>Legitimate Interests: fraud prevention, security, service improvement.</li>
                <li>Consent: analytics cookies, marketing (if ever introduced).</li>
                <li>Legal Obligation: tax, accounting, regulatory compliance. </li>
              </ul>
              <p>Where consent is required, you may withdraw it at any time.</p>
            </section>

            {/* 4. How We Use Data */}
            <section>
              <h2 className="text-base font-semibold">4. How We Use Your Information</h2>
              <p>We may use your personal data to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Deliver digital briefs and enable download access</li>
                <li>Provide customer support</li>
                <li>Process payments securely</li>
                <li>Prevent fraud and maintain platform security </li>
                <li>Improve site performance and analytics (if consented) </li>
                <li>Comply with legal or regulatory obligations </li>
              </ul>
              <p className="mt-2 font-medium">We do not sell your personal information. </p>
            </section>

            {/* 5. Payments */}
            <section>
              <h2 className="text-base font-semibold">5. Payments & Stripe</h2>
              <p>
                Payments are processed by Stripe, a PCI-compliant provider. 
              </p>
              <p>Stripe may collect and process: </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>payment tokens </li>
                <li>transaction metadata </li>
                <li>fraud-prevention data </li>
              </ul>
              <p>
                Processing is subject to <b> Stripe’s Privacy Policy </b>, and Stripe may act as an independent controller for some processing.
              </p>
            </section>

            {/* 6. Cookies */}
            <section>
              <h2 className="text-base font-semibold">6. Cookies & Tracking</h2>
              <p>
               We may use cookies for: 
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>essential functionality  </li>
                <li>preference saving </li>
                <li>security </li>
                <li>analytics (only if you provide clear consent) </li>
              </ul>
              <p>Analytics cookies (e.g., Google Analytics/Vercel Analytics) will<b> not </b>activate without your opt-in consent, as required by GDPR/ePrivacy laws.</p>
              <p className="mt-2">
                See our{" "}
                <a
                  className="underline underline-offset-4 hover:text-blue-400"
                  href="/evaltree/cookies"
                ><b>
                  Cookie Policy
                  </b>
                </a>{" "}
                for more details.
              </p>
            </section>

            {/* 7. Retention */}
            <section>
              <h2 className="text-base font-semibold">7. Data Retention</h2>
              <p>We retain data only for as long as necessary for: </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>service delivery</li>
                <li>Customer support</li>
                <li>Legal and regulatory obligations</li>
                <li>Fraud prevention</li>
                <li>Business continuity</li>
              </ul>
              <p>When no longer required, data is deleted or anonymized. </p>
            </section>

            {/* 8. Data Sharing */}
            <section>
              <h2 className="text-base font-semibold">8. Data Sharing</h2>
              <p>We may share data with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>Stripe </b>(payment processing) </li>
                <li><b>Hosting providers</b> (e.g., Vercel)</li>
                <li><b>Analytics providers </b> (if analytics enabled and consented) </li>
                <li><b>Legal authorities</b> only when legally required </li>
              </ul>
              <p>All third-party providers comply with applicable data-protection regulations. </p>
            </section>

            {/* 9. International Transfers */}
            <section>
              <h2 className="text-base font-semibold">
                9. International Data Transfers
              </h2>
              <p>All third-party providers comply with applicable data-protection regulations.</p>
              <p>When required, we rely on: </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>SCCs (Standard Contractual Clauses) </b></li>
                <li><b>UK Addendum</b></li>
                <li><b>Adequacy decisions </b></li>
                <li>Third-party compliance frameworks </li>
              </ul>
              <p>We take steps to ensure your data remains protected.</p>
            </section>

            {/* 10. Data Security */}
            <section>
              <h2 className="text-base font-semibold">10. Data Security</h2>
              <p>We use appropriate technical and organizational measures including: </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encryption</li>
                <li>Secure hosting environments </li>
                <li>restricted access controls</li>
                <li>monitoring and fraud-prevention tools </li>
              </ul>
              <p>Despite safeguards, no internet transmission is completely secure. </p>
            </section>

            {/* 11. Rights */}
            <section>
              <h2 className="text-base font-semibold">11. Your Rights</h2>

              <p>Depending on your region (GDPR, UK GDPR, DPDP), you may have the right to:</p>

              <ul className="list-disc pl-5 space-y-1">
                <li>Access your personal data </li>
                <li>Correct incorrect or incomplete data</li>
                <li>Request deletion (“right to be forgotten”) </li>
                <li>Withdraw consent </li>
                <li>Restrict processing </li>
                <li>Object to processing (where applicable) </li>
                <li>Request data portability </li>
                <li>Lodge a complaint with a regulator </li>
              </ul>
              <p><b>For EU/UK Users:</b></p>
              <p>You may file complaints with your local Data Protection Authority or the UK ICO. </p>
              <p><b>For India (DPDP Act) Users: </b></p>
              <p>You may file complaints with the<b> Data Protection Board of India </b></p>
              <p className="mt-2">
                To exercise your rights, Contact: {" "}
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
                Evaltree Insights is not intended for users under the digital consent age applicable in their jurisdiction (13–16 depending on region). <br/>We do not knowingly collect data from children.

              </p>
            </section>

            {/* 13. Automated Decision Making */}
            <section>
              <h2 className="text-base font-semibold">
                13. Automated Decision-Making
              </h2>
              <p>
                We do not use automated decision-making that produces legal or significant effects on users. 
              </p>
            </section>

            {/* 14. Changes */}
            <section>
              <h2 className="text-base font-semibold">14. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time.<br/> 
                The “Last Updated” date reflects the most recent version. <br/>
                Material changes will be communicated where appropriate. <br/>
              </p>
            </section>

            {/* 15. Contact */}
            <section>
              <h2 className="text-base font-semibold">15. Contact</h2>
              <p>
                For questions, rights requests, or privacy concerns: 
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
