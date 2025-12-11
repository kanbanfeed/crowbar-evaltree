import { CROWBAR_REGISTERED_ADDRESS } from "../app/evaltree/_legal";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Previews", href: "#previews" },
  { label: "Pricing", href: "#pricing" },
];

const STRIPE_SINGLE = "https://buy.stripe.com/dRm7sK8uLaA89lNcL77Vm0J";
const STRIPE_PACK = "https://buy.stripe.com/bJe14mdP5eQo2Xp9yV7Vm0K";

export default function Footer(){
    return(
        <footer className="border-t border-[#0F1C3F]/10 bg-white">
                <div className="w-full px-6 py-10">
                  <div className="grid gap-8 md:grid-cols-3">
                    {/* Brand */}
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-[#0F1C3F]" />
                        <div>
                          <div className="font-semibold">Evaltree Insights by Crowbar</div>
                          <div className="text-sm opacity-70">Crowbar Ltd</div>
                        </div>
                      </div>
{/*         
                      <p className="mt-4 text-sm leading-relaxed opacity-75">
                        Concise 3–5 page briefs on AI, geopolitics, valuation, and global trends —
                        designed for fast understanding and better decisions.
                      </p> */}
        
                      {/* ✅ Company details required */}
                      <div className="mt-4 text-sm opacity-75">
                        <b >Support:</b>{" "}
                        <a
                          className="font-medium underline underline-offset-4"
                          href="mailto:support@crowbarltd.com"
                        >
                          <b>support@crowbarltd.com</b>
                        </a>
                        <p className="mt-1 text-sm opacity-70">
        Typical response time: within 7 business days.
      </p>
                      </div>
                      <div className="mt-2 text-sm opacity-75">
                        <b>Registered address:</b>
                        <div className="mt-1 whitespace-pre-line">
                          {CROWBAR_REGISTERED_ADDRESS}
                        </div>
                      </div>
        
                      {/* ✅ Payment disclaimer required in footer */}
                     
                    </div>
        
                    {/* Links */}
                    <div className="md:justify-self-center">
                      <div className="text-sm font-semibold">Explore</div>
                      <div className="mt-3 flex flex-col gap-2 text-sm">
                        {navItems.map((item) => (
                          <a key={item.href} href={item.href} className="opacity-80 hover:opacity-100">
                            {item.label}
                          </a>
                        ))}
                        <a href={STRIPE_SINGLE} className="opacity-80 hover:opacity-100">
                          Buy Single ($2.99)
                        </a>
                        <a href={STRIPE_PACK} className="opacity-80 hover:opacity-100">
                          Buy Five Briefs ($8.99)
                        </a>
                      </div>
                    </div>
        
                    {/* Legal */}
                    <div className="md:justify-self-end">
                      <div className="text-sm font-semibold">Legal</div>
                      <div className="mt-3 flex flex-col gap-2 text-sm">
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
                       <strong> Payments processed securely by Crowbar Ltd.</strong>
                      </div>
                    </div>
                  </div>
        
                  <div className="mt-10 flex flex-col gap-2 border-t border-[#0F1C3F]/10 pt-6 text-sm opacity-70 md:flex-row md:items-center md:justify-between">
                    <div>© Crowbar Ltd 2025. All rights reserved.</div>
                    <a href="#top" className="font-medium opacity-80 hover:opacity-100">
                      Back to top ↑
                    </a>
                  </div>
                </div>
              </footer>
    )
}