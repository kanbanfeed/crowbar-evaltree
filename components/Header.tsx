const navItems = [
  { label: "Home", href: ".#top" },
  { label: "About", href: ".#about" },
  { label: "Previews", href: ".#previews" },
  { label: "Pricing", href: ".#pricing" },
];

const STRIPE_SINGLE = "https://buy.stripe.com/dRm7sK8uLaA89lNcL77Vm0J";
const STRIPE_PACK = "https://buy.stripe.com/bJe14mdP5eQo2Xp9yV7Vm0K";

export default function Header() {
  return (

 <header className="sticky top-0 z-50 border-b border-[#0F1C3F]/10 bg-white/85 backdrop-blur">
        <div className=" flex w-full items-center justify-between gap-4 px-16 py-4">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#0F1C3F]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight md:text-base">
                Evaltree Insights
              </div>
              <div className="text-xs opacity-70">by Crowbar</div>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium opacity-80 hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          {/* <div className="flex items-center gap-3">
            <a
              href="mailto:support@crowbarltd.com"
              className="hidden text-sm font-medium opacity-80 hover:opacity-100 md:inline"
            >
              support@crowbarltd.com
            </a>

            <a
              href={STRIPE_SINGLE}
              className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Buy Single Brief – $2.99 USD
            </a>
          </div> */}
        </div>

        {/* Mobile nav */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-3 md:hidden">
          <div className="flex gap-3 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full bg-[#F5F6F8] px-3 py-1.5 font-medium opacity-90"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

        )}