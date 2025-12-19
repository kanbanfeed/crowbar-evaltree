import Image from "next/image";
import { CROWBAR_REGISTERED_ADDRESS } from "../app/evaltree/_legal";

const navItems = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Previews", href: "/#previews" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Download", href: "/evaltree/library" },

];

export default function Footer() {
  return (
    <footer className="border-t border-[#0F1C3F]/10 bg-white">
      <div className="w-full px-6 py-10">
     
        <div className="grid gap-8 text-center md:grid-cols-4 md:text-left">
       
          <div className="md:justify-self-center">
            <div className="flex items-center justify-center gap-3 md:justify-start">
        
              <div className="relative h-10 w-[100px] max-w-[160px]">
                <Image
                  src="/crowbar-ventures.png"
                  alt="Crowbar Ventures"
                  fill
                  className="object-contain"
                  
                />
              </div>

              <div className="text-left">
                <div className="font-semibold">Evaltree Insights</div>
                <div className="text-sm opacity-70">by Crowbar</div>
              </div>
            </div>
          </div>

          {/* 2) Explore */}
          <div className="md:justify-self-center">
            <div className="text-sm font-semibold">Explore</div>
            <div className="mt-3 flex flex-col items-center gap-2 text-sm md:items-start">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="opacity-80 hover:opacity-100"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* 3) Legal */}
          <div className="md:justify-self-start">
            <div className="text-sm font-semibold">Legal</div>
            <div className="mt-3 flex flex-col items-center gap-2 text-sm md:items-start">
              <a href="/evaltree/privacy" className="opacity-80 hover:opacity-100">
                Privacy Policy
              </a>
              <a href="/evaltree/terms" className="opacity-80 hover:opacity-100">
                Terms of Use / Terms of Purchase
              </a>
              <a href="/evaltree/cookies" className="opacity-80 hover:opacity-100">
                Cookie Policy
              </a>
            </div>

            <div className="mt-2 text-sm opacity-70">
              <strong>Payments processed securely by Crowbar Ltd.</strong>
            </div>
          </div>

          {/* 4) Contact */}
          <div className="md:justify-self-start">
            <div className="text-sm font-semibold">Contact</div>

            <div className="mt-3 text-sm opacity-75">
              <a
                className="font-medium underline underline-offset-4"
                href="mailto:support@crowbarltd.com"
              >
                support@crowbarltd.com
              </a>
              <p className="mt-1 text-sm opacity-70">
                Typical response time: within 7 business days.
              </p>
            </div>

            <div className="mt-3 text-sm opacity-75">
              <div className="font-semibold">Registered address:</div>
              <div className="mt-1 whitespace-pre-line opacity-70">
                {CROWBAR_REGISTERED_ADDRESS}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-[#0F1C3F]/10 pt-6 text-sm opacity-70 md:flex-row md:justify-between">
          <div>© Crowbar Ltd 2025. All rights reserved.</div>

          {/*  VAT line (site-wide footer disclosure) */}
          <div className="text-xs opacity-70">
            Evaltree Insights by Crowbar Ltd – Prices exclude VAT. VAT is not currently charged.
          </div>

          <a href="#top" className="font-medium opacity-80 hover:opacity-100">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
