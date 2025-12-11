// app/evaltree/cookies/page.tsx

export const metadata = {
  title: "Cookie Policy — Evaltree Insights by Crowbar",
  description:
    "Cookie Policy for Evaltree Insights by Crowbar. Learn what cookies we use and how you can manage your preferences.",
};

export default function CookiePolicyPage() {
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
          <h1 className="text-2xl font-semibold md:text-3xl">Cookie Policy</h1>
          <p className="mt-2 text-sm opacity-70">
            Evaltree Insights by Crowbar • Last Updated: 11/12/2025
          </p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed opacity-90">
            <p>
              This Cookie Policy explains how cookies and similar technologies
              are used on Evaltree Insights by Crowbar, a product of Crowbar
              Ltd.
            </p>

            {/* 1. What Are Cookies? */}
            <section>
              <h2 className="text-base font-semibold">1. What Are Cookies?</h2>
              <p className="mt-2">
                Cookies are small text files stored on your device when you
                visit a website. They help the site function correctly, remember
                your preferences, and—if enabled—support performance and usage
                insights.
              </p>
            </section>

            {/* 2. Cookies We Use */}
            <section>
              <h2 className="text-base font-semibold">2. Cookies We Use</h2>

              <h3 className="mt-3 font-medium">A. Essential Cookies</h3>
              <p className="mt-2">
                These cookies are required for the website to operate properly,
                including:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>page loading and navigation</li>
                <li>security and fraud prevention</li>
                <li>remembering cookie settings and preferences</li>
                <li>enabling delivery of purchased digital content</li>
              </ul>
              <p className="mt-2 text-sm opacity-85">
                Essential cookies cannot be disabled, as they are necessary for
                core functionality.
              </p>

              <h3 className="mt-4 font-medium">
                B. Analytics Cookies (optional)
              </h3>
              <p className="mt-2">
                Analytics cookies are used only if they are enabled and you have
                given consent. At present, we do not actively use analytics
                cookies, but examples of tools that may be used in future
                include:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Vercel Analytics</li>
                <li>Google Analytics</li>
              </ul>
              <p className="mt-2">
                These cookies help measure:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>traffic patterns</li>
                <li>page interactions</li>
                <li>performance metrics</li>
              </ul>
              <p className="mt-2 text-sm opacity-85">
                Analytics cookies may be set by trusted third-party providers.
              </p>
            </section>

            {/* 3. How We Use Cookies */}
            <section>
              <h2 className="text-base font-semibold">3. How We Use Cookies</h2>
              <p className="mt-2">
                Cookies may be used to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>operate and secure the site,</li>
                <li>remember user choices and preferences,</li>
                <li>improve performance and usability, and</li>
                <li>
                  understand site usage (only when analytics cookies are
                  accepted).
                </li>
              </ul>
              <p className="mt-2 font-medium">
                We do not use cookies for advertising or behavioural targeting.
              </p>
            </section>

            {/* 4. Consent & Preferences */}
            <section>
              <h2 className="text-base font-semibold">
                4. Consent & Cookie Preferences
              </h2>
              <p className="mt-2">
                If a cookie banner appears, you can:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>accept analytics cookies,</li>
                <li>decline analytics cookies, or</li>
                <li>change your cookie preferences at any time (where offered).</li>
              </ul>
              <p className="mt-2">
                Analytics cookies will only load after you click{" "}
                <span className="font-medium">Accept</span>. You can also
                control or delete cookies through your browser settings.
              </p>
            </section>

            {/* 5. Third-Party Cookies */}
            <section>
              <h2 className="text-base font-semibold">5. Third-Party Cookies</h2>
              <p className="mt-2">
                If analytics tools are enabled, third-party providers such as
                Google or Vercel may place their own cookies. These providers
                operate under their own privacy and cookie policies, which we do
                not control.
              </p>
            </section>

            {/* 6. Cookie Duration */}
            <section>
              <h2 className="text-base font-semibold">6. Cookie Duration</h2>
              <p className="mt-2">
                The duration of cookies can vary:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>
                  Essential cookies are typically session-based or short-term.
                </li>
                <li>
                  Analytics cookies (if used) may remain for several days or
                  months, depending on provider settings.
                </li>
              </ul>
              <p className="mt-2 text-sm opacity-85">
                More information about how we handle data is available in our{" "}
                <a
                  className="underline underline-offset-4"
                  href="/evaltree/privacy"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            {/* 7. Your Rights */}
            <section>
              <h2 className="text-base font-semibold">7. Your Rights</h2>
              <p className="mt-2">
                Depending on your region, you may have rights to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>withdraw your cookie consent,</li>
                <li>
                  request deletion of analytics data (where applicable), and
                </li>
                <li>restrict or disable cookies via browser or device settings.</li>
              </ul>
              <p className="mt-2 text-sm opacity-85">
                Consent can be withdrawn at any time by adjusting settings in
                your browser or using any cookie controls provided on the site.
              </p>
            </section>

            {/* 8. Contact */}
            <section>
              <h2 className="text-base font-semibold">8. Contact</h2>
              <p className="mt-2">
                If you have questions about this Cookie Policy or how cookies are
                used on Evaltree Insights by Crowbar, please contact:
              </p>
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

            <div className="mt-8 border-t border-[#0F1C3F]/10 pt-5 text-xs opacity-70">
              Payments processed securely by Crowbar Ltd.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
