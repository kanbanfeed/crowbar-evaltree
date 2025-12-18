"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Home", href: ".#top" },
  { label: "About", href: ".#about" },
  { label: "Previews", href: ".#previews" },
  { label: "Pricing", href: ".#pricing" },
];

export default function Header() {
  const { user, loading, signInWithCrowbar, signOutUser } = useAuth();
  const isLoggedIn = !!user?.email;

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Used to detect outside tap
  const headerRef = useRef<HTMLElement | null>(null);

  function handleMobileNavClick() {
    setMobileOpen(false);
  }

  // ✅ Close mobile menu when user taps/clicks outside the header/menu area
  useEffect(() => {
    if (!mobileOpen) return;

    function onPointerDown(e: PointerEvent) {
      const el = headerRef.current;
      if (!el) return;

      if (!el.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 relative border-b border-[#0F1C3F]/10 bg-white/85 backdrop-blur"
    >
      <div className="flex w-full items-center justify-between gap-4 px-6 py-4 md:px-16">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 min-w-0">
          {/* ✅ Logo (width controlled) */}
          <div className="relative h-9 w-[100px] max-w-[140px] sm:w-[100px] sm:max-w-[100px]">
            <Image
              src="/crowbar-ventures.png"
              alt="Crowbar Ventures"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 140px, 160px"
            />
          </div>

          <div className="leading-tight min-w-0">
            <div className="text-sm font-semibold tracking-tight md:text-base truncate">
              Evaltree Insights
            </div>
            <div className="text-xs opacity-70 truncate">by Crowbar</div>
          </div>
        </a>

        {/* Desktop Nav */}
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
        <div className="flex items-center gap-3">
          {/* Desktop email */}
          {isLoggedIn && (
            <div className="hidden text-sm opacity-80 md:block">{user?.email}</div>
          )}

          {!isLoggedIn ? (
            <button
              onClick={signInWithCrowbar}
              disabled={loading}
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Loading…" : "Login"}
            </button>
          ) : (
            <button
              onClick={signOutUser}
              className="hidden md:inline-flex items-center justify-center rounded-xl border border-[#0F1C3F]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0F1C3F] hover:bg-[#F5F6F8]"
            >
              Logout
            </button>
          )}

          {/* Mobile Toggle Button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-[#0F1C3F]/10 bg-white p-2 md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#0F1C3F]"
            >
              {mobileOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu Panel (overlay; does NOT push content) */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
          mobileOpen
            ? "max-h-96 opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 pb-4">
          <div className="rounded-2xl border border-[#0F1C3F]/10 bg-white p-3 shadow-sm">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleMobileNavClick}
                  className="rounded-xl bg-[#F5F6F8] px-3 py-2 text-sm font-medium opacity-90"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile login/logout */}
            <div className="mt-3 border-t border-[#0F1C3F]/10 pt-3">
              {isLoggedIn ? (
                <>
                  <div className="mb-2 text-xs opacity-70">{user?.email}</div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      signOutUser();
                    }}
                    className="w-full rounded-xl border border-[#0F1C3F]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0F1C3F] hover:bg-[#F5F6F8]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signInWithCrowbar();
                  }}
                  disabled={loading}
                  className="w-full rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
                >
                  {loading ? "Loading…" : "Login"}
                </button>
              )}
            </div>
          </div>

          {!isLoggedIn && (
            <div className="mt-3 text-xs text-[#0F1C3F]/70">
              Some sections are available after login.
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
