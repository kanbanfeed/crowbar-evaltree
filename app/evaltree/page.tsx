"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import PreviewModal from "@/components/PreviewModal";

type Brief = { id: string; title: string; slug: string; preview_url: string };

// ── Quiz questions ────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1",
    text: "How long have you been in your current role?",
    options: ["Less than 1 year", "1–3 years", "3–7 years", "7+ years"],
  },
  {
    id: "q2",
    text: "What best describes how you feel going to work most days?",
    options: [
      "Energised and engaged",
      "Neutral — it pays the bills",
      "Drained but pushing through",
      "Checked out or actively miserable",
    ],
  },
  {
    id: "q3",
    text: "In the last 6 months, how often have you seriously considered leaving?",
    options: ["Never", "Once or twice", "Monthly", "Almost every week"],
  },
  {
    id: "q4",
    text: "What's holding you back the most right now?",
    options: [
      "Fear of income drop",
      "Not sure what else I'd do",
      "I'm actually close to a promotion",
      "Family or visa constraints",
    ],
  },
  {
    id: "q5",
    text: "How would you describe your relationship with your manager?",
    options: [
      "Supportive and invested in me",
      "Professional but distant",
      "Difficult or unpredictable",
      "Non-existent / I manage myself",
    ],
  },
  {
    id: "q6",
    text: "Which outcome matters most to you in the next 12 months?",
    options: [
      "Promotion or pay rise",
      "Better work-life balance",
      "A career change or pivot",
      "Just clarity — I don't know yet",
    ],
  },
  {
    id: "q7",
    text: "Have you ever mapped out your actual options with data — or is it mostly gut feel?",
    options: [
      "Pure gut feel so far",
      "Some research but no clear picture",
      "I've done spreadsheets / pros & cons",
      "I've worked with a coach or mentor",
    ],
  },
];

// ── Case snippets ─────────────────────────────────────────────────────────────
const CASE_SNIPPETS = [
  { role: "Software engineer, 38", situation: "3 years stagnant, offered a lateral move", outcome: "Stayed and got promoted within 8 months after mapping leverage points", tag: "Stayed", color: "bg-emerald-50 border-emerald-200 text-emerald-800", dot: "bg-emerald-500" },
  { role: "Marketing director, 44", situation: "Toxic culture, second job offer on table", outcome: "Switched — new role paid 22% more; burnout cleared within 90 days", tag: "Switched", color: "bg-blue-50 border-blue-200 text-blue-800", dot: "bg-blue-500" },
  { role: "Finance analyst, 31", situation: "Considering MBA to escape current trajectory", outcome: "Skipped MBA; used The Map to negotiate internal transfer instead", tag: "Redirected", color: "bg-amber-50 border-amber-200 text-amber-800", dot: "bg-amber-500" },
  { role: "Operations manager, 52", situation: "Post-redundancy, evaluating 3 offers", outcome: "Chose lower-paying role with equity — outperformed financially by year 2", tag: "Stayed", color: "bg-emerald-50 border-emerald-200 text-emerald-800", dot: "bg-emerald-500" },
  { role: "Tech lead, 35", situation: "Burned out, fantasising about freelance", outcome: "Reckoning report revealed freelance risk was higher than assumed — renegotiated instead", tag: "Redirected", color: "bg-amber-50 border-amber-200 text-amber-800", dot: "bg-amber-500" },
  { role: "Product manager, 29", situation: "First job offer abroad, scared of the unknown", outcome: "Switched — Mirror output showed her profile fit the new market well", tag: "Switched", color: "bg-blue-50 border-blue-200 text-blue-800", dot: "bg-blue-500" },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Is this advice?", a: "No. Evaltree is a data and analysis product. We produce structured output based on your inputs and aggregated case data. We don't tell you what to do — we show you what people like you have done, and what the data suggests." },
  { q: "Where does the data come from?", a: "Our case library is built from anonymised professional career events collected with consent. All personally identifying details are blurred or generalised before inclusion." },
  { q: "What's the refund policy?", a: "All purchases are non-refundable due to the digital nature of the product. If you have a genuine issue with your delivery, contact support@crowbarltd.com and we'll make it right." },
  { q: "How is Mirror different from The Map?", a: "Mirror is your profile — who you are relative to the data. The Map is your decision framework — the full picture of your options, risks, and likely outcomes. Most people start with Mirror, then unlock The Map." },
  { q: "How long does delivery take?", a: "Instantly. Payment confirmed → your report is generated and delivered to your email within minutes." },
  { q: "Is my diagnostic data private?", a: "Yes. Your answers are used only to generate your report. We don't sell or share individual diagnostic data." },
];

// ── Tiers ─────────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "mirror", name: "Mirror", price: "$45", badge: null,
    tagline: "Know where you stand",
    features: ["7-question diagnostic", "Profile match against 1,200+ cases", "3-page anonymised report", "Risk score for staying vs leaving", "Email delivery within minutes"],
    notIncluded: ["Full options map", "Scenario modelling", "Reckoning deep-dive"],
    cta: "Get Mirror – $45", plan: "45",
  },
  {
    id: "map", name: "The Map", price: "$95", badge: "Most Popular",
    tagline: "See all your options clearly",
    features: ["Everything in Mirror", "Full 8-page decision framework", "3 scenario paths modelled", "Salary & trajectory benchmarks", "Leverage point analysis", "Priority action list"],
    notIncluded: ["Reckoning deep-dive"],
    cta: "Get The Map – $95", plan: "95",
  },
  {
    id: "reckoning", name: "Reckoning", price: "$295", badge: null,
    tagline: "The complete picture",
    features: ["Everything in The Map", "12-page comprehensive report", "Full risk / reward breakdown", "Industry transition analysis", "5-year trajectory projection", "Personalised next-step roadmap"],
    notIncluded: [],
    cta: "Get Reckoning – $295", plan: "99",
  },
];

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const pad = (n: number) => String(n).padStart(2, "0");

export default function EvaltreeLanding() {
  const { user, loading, signInWithCrowbar } = useAuth();
  const isLoggedIn = !!user?.email;

  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [count, setCount] = useState<number>(0);
  const packEnabled = count >= 5;
  const [guestEmail, setGuestEmail] = useState<string>("");
  const emailToUse = useMemo(() => (user?.email || guestEmail || "").trim(), [user?.email, guestEmail]);
  const [purchasedSlugs, setPurchasedSlugs] = useState<string[]>([]);
  const [purchasedLoading, setPurchasedLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizEmail, setQuizEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ h: 71, m: 59, s: 59 });
  useEffect(() => {
    const stored = localStorage.getItem("evaltree_countdown_start");
    const start = stored ? parseInt(stored) : Date.now();
    if (!stored) localStorage.setItem("evaltree_countdown_start", String(start));
    const end = start + 72 * 60 * 60 * 1000;
    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) { setTimeLeft({ h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [r1, r2] = await Promise.all([fetch("/api/briefs", { cache: "no-store" }), fetch("/api/briefs/count", { cache: "no-store" })]);
        setBriefs(((await r1.json()).briefs || []).slice(0, 3));
        setCount((await r2.json()).count || 0);
      } catch { setBriefs([]); setCount(0); }
    })();
  }, []);

  useEffect(() => {
    if (!emailToUse || !isValidEmail(emailToUse)) { setPurchasedSlugs([]); return; }
    (async () => {
      setPurchasedLoading(true);
      try {
        const r = await fetch("/api/purchase/purchased-briefs-user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: emailToUse }) });
        setPurchasedSlugs((await r.json().catch(() => ({}))).slugs || []);
      } catch { setPurchasedSlugs([]); } finally { setPurchasedLoading(false); }
    })();
  }, [emailToUse]);

  function requireEmailOrStop() {
    if (!emailToUse || !isValidEmail(emailToUse)) {
      alert("Please enter a valid email to checkout.");
      document.getElementById("checkout-email")?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    return true;
  }

  async function startCheckout(plan: string) {
    if (!requireEmailOrStop()) return;
    const r = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, email: emailToUse }) });
    const d = await r.json().catch(() => ({}));
    if (d.url) window.location.href = d.url;
    else alert(d.error || "Checkout failed");
  }

  async function checkoutSelected(slug: string) {
    if (!requireEmailOrStop()) return;
    if (purchasedSlugs.includes(slug)) return;
    const r = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: "7", briefSlugs: [slug], email: emailToUse }) });
    const d = await r.json().catch(() => ({}));
    if (d.url) window.location.href = d.url;
    else alert(d.error || "Checkout failed");
  }

  function openPreview(slug: string, title: string) { setPreviewSlug(slug); setPreviewTitle(title); setPreviewOpen(true); }
  function closePreview() { setPreviewOpen(false); setPreviewSlug(null); setPreviewTitle(""); }

  // Quiz handlers
  function selectAnswer(qId: string, answer: string) {
    const newAnswers = { ...answers, [qId]: answer };
    setAnswers(newAnswers);
    if (currentQ === 1) { setTimeout(() => setCurrentQ(2), 300); return; }
    if (currentQ < QUESTIONS.length - 1) { setTimeout(() => setCurrentQ(currentQ + 1), 300); }
    else { setTimeout(() => setQuizComplete(true), 300); }
  }

  async function captureEmail() {
    if (!isValidEmail(quizEmail)) { alert("Please enter a valid email."); return; }
    setEmailSubmitting(true);
    try {
      await fetch("/api/capture-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: quizEmail, source: "diagnostic_quiz", answers }) }).catch(() => {});
    } finally { setEmailCaptured(true); setEmailSubmitting(false); setTimeout(() => setCurrentQ(2), 400); }
  }

  function startQuiz() {
    setQuizStarted(true); setCurrentQ(0); setAnswers({}); setQuizComplete(false);
    setTimeout(() => quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  // Mirror teaser score
  const drainedAnswer = answers["q2"] || "";
  const consideringLeave = answers["q3"] || "";
  const mirrorScore = drainedAnswer.includes("Drained") || drainedAnswer.includes("Checked")
    ? consideringLeave.includes("every week") ? 82 : 67 : 44;

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">

      {/* ── URGENCY BANNER ── */}
      <div className="bg-[#0F1C3F] text-white text-center py-2 px-4 text-xs font-medium">
        <span className="opacity-80">Limited intro pricing ends in </span>
        <span className="font-bold text-[#FF6A00]">{pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}</span>
        <span className="opacity-80"> — prices increase after this window</span>
      </div>

      {/* ── HERO ── */}
      <section id="top" className="mx-auto max-w-6xl px-6 pb-10 pt-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F8] px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
            <span className="opacity-80">Data-driven career analysis • 1,247+ cases</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl leading-tight">
            Should you stay, switch, or completely rethink it?
          </h1>
          <p className="mt-4 text-lg opacity-75 md:text-xl max-w-2xl">
            Evaltree analyses your career situation against thousands of real outcomes. Not gut feel — pattern data.
          </p>

          {!loading && !isLoggedIn && (
            <div className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
              <div className="text-sm font-semibold">Optional: Sign in</div>
              <p className="mt-1 text-sm opacity-80">You can browse everything without login.</p>
              <button onClick={signInWithCrowbar} className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95">
                Continue with Crowbar
              </button>
            </div>
          )}

          {!isLoggedIn && (
            <div id="checkout-email" className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-white p-5">
              <div className="text-sm font-semibold">Email for checkout</div>
              <p className="mt-1 text-sm opacity-80">Enter your email to receive purchase links and downloads.</p>
              <input value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="you@example.com"
                className="mt-3 w-full rounded-xl border border-[#0F1C3F]/15 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#FF6A00]" />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={startQuiz}
              className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-8 py-3.5 font-semibold text-white shadow-sm hover:bg-[#e65f00] active:scale-95 transition-all">
              Take the Free Diagnostic →
            </button>
            <button onClick={() => document.getElementById("real-cases")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center rounded-xl border border-[#0F1C3F]/20 bg-white px-8 py-3.5 font-semibold hover:bg-[#F5F6F8] transition-all">
              See What Happened to People Like You
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-6">
            <div className="text-sm opacity-60"><span className="text-[#FF6A00] font-bold">340+</span> professionals this month</div>
            <div className="text-sm opacity-60"><span className="text-[#FF6A00] font-bold">1,247</span> cases in database</div>
            <div className="text-sm opacity-60"><span className="text-[#FF6A00] font-bold">3 min</span> average completion time</div>
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC QUIZ ── */}
      <section ref={quizRef} id="diagnostic" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-6">
        {!quizStarted ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm text-center md:p-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6A00]/10 px-4 py-2 text-sm text-[#FF6A00] font-semibold mb-4">Free — takes 3 minutes</div>
            <h2 className="text-2xl font-bold md:text-3xl">Free Career Diagnostic</h2>
            <p className="mt-3 opacity-70 max-w-lg mx-auto">7 questions. We'll match your situation against 1,247 real career cases and show you what the data says.</p>
            <button onClick={startQuiz} className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-8 py-3.5 font-semibold text-white hover:bg-[#e65f00] active:scale-95 transition-all">
              Start Diagnostic →
            </button>
          </div>
        ) : !quizComplete ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#FF6A00] uppercase tracking-wide">Question {currentQ + 1} of {QUESTIONS.length}</span>
                <span className="text-xs opacity-50">{Math.round(((currentQ + 1) / QUESTIONS.length) * 100)}% complete</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#F5F6F8]">
                <div className="h-1.5 rounded-full bg-[#FF6A00] transition-all duration-500" style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-6 md:text-2xl">{QUESTIONS[currentQ].text}</h2>

            <div className="grid gap-3 md:grid-cols-2">
              {QUESTIONS[currentQ].options.map((opt) => (
                <button key={opt} onClick={() => selectAnswer(QUESTIONS[currentQ].id, opt)}
                  className={["rounded-2xl border-2 p-4 text-left text-sm font-medium transition-all hover:border-[#FF6A00] hover:bg-[#FF6A00]/5",
                    answers[QUESTIONS[currentQ].id] === opt ? "border-[#FF6A00] bg-[#FF6A00]/5" : "border-[#0F1C3F]/10 bg-white"].join(" ")}>
                  {opt}
                </button>
              ))}
            </div>

            {/* Email capture after Q2 */}
            {currentQ === 2 && !emailCaptured && (
              <div className="mt-6 rounded-2xl border border-[#FF6A00]/30 bg-[#FF6A00]/5 p-5">
                <p className="text-sm font-semibold mb-1">Save your results — enter email to continue</p>
                <p className="text-xs opacity-70 mb-3">We'll send your diagnostic results and a breakdown of similar cases. No spam.</p>
                <div className="flex gap-2">
                  <input type="email" value={quizEmail} onChange={(e) => setQuizEmail(e.target.value)} placeholder="you@example.com"
                    className="flex-1 rounded-xl border border-[#0F1C3F]/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#FF6A00]" />
                  <button onClick={captureEmail} disabled={emailSubmitting}
                    className="rounded-xl bg-[#FF6A00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e65f00] disabled:opacity-60 transition-all">
                    {emailSubmitting ? "..." : "Continue"}
                  </button>
                </div>
                <button onClick={() => { setEmailCaptured(true); setCurrentQ(2); }} className="mt-2 text-xs opacity-50 hover:opacity-70">Skip for now</button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mirror teaser */}
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-700 font-semibold mb-4">✓ Diagnostic complete</div>
              <h2 className="text-2xl font-bold mb-2">Here's a preview of your Mirror profile</h2>
              <p className="text-sm opacity-70 mb-6">Based on 1,247 similar cases — your full report is ready to unlock.</p>

              <div className="rounded-3xl border-2 border-dashed border-[#FF6A00]/30 bg-[#F5F6F8] p-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span className="text-[80px] font-black text-[#FF6A00]/5 rotate-[-20deg] whitespace-nowrap">SAMPLE</span>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
                    <span className="text-xs font-semibold uppercase tracking-widest opacity-60">Mirror Report — Anonymised Preview</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Profile: Mid-Career / Crossroads</h3>
                  <p className="text-sm opacity-70 mb-4">Based on 1,247 similar cases in our database.</p>
                  <div className="rounded-2xl bg-white p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold">Stay vs Leave Risk Score</span>
                      <span className="text-sm font-bold text-[#FF6A00]">{mirrorScore} / 100</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#F5F6F8]">
                      <div className="h-2 rounded-full bg-[#FF6A00]" style={{ width: `${mirrorScore}%` }} />
                    </div>
                    <p className="mt-2 text-xs opacity-60">
                      {mirrorScore >= 70 ? "High signal for transition. Staying carries elevated burnout risk." : mirrorScore >= 50 ? "Moderate tension. Optimal move depends on leverage analysis." : "Low immediate risk. Growth opportunity likely still in current role."}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#FF6A00]/5 border border-[#FF6A00]/20 p-4">
                    <p className="text-xs font-semibold text-[#FF6A00] mb-1">🔒 Full insight locked</p>
                    <p className="text-xs opacity-70">Your complete Mirror report includes market positioning, leverage points, manager dynamic score, and a personalised risk summary.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade nudge */}
            <div className="rounded-3xl bg-[#0F1C3F] text-white p-8 shadow-sm md:p-10">
              <p className="text-sm font-semibold text-[#FF6A00] mb-2 uppercase tracking-wide">Based on 1,247 similar cases…</p>
              <h3 className="text-xl font-bold mb-3">Your profile matches a high-signal transition moment.</h3>
              <p className="opacity-75 text-sm mb-6">People in your situation who acted on data (not gut feel) were 3× more likely to report satisfaction at 12 months.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={() => startCheckout("45")} className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white hover:bg-[#e65f00] active:scale-95 transition-all">
                  Unlock Mirror – $45
                </button>
                <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-all">
                  See all plans
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── PRODUCTS / COMPARISON TABLE ── */}
      <section id="products" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-24">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Choose your report</h2>
          <p className="mt-1 opacity-70">Start with Mirror. Upgrade anytime.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier.id} className={["rounded-3xl bg-white p-7 shadow-sm relative flex flex-col", tier.badge ? "ring-2 ring-[#FF6A00]" : ""].join(" ")}>
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#FF6A00] px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                    {tier.badge} — Chosen by 340+ professionals last month
                  </span>
                </div>
              )}
              <div className="mb-auto">
                <div className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">{tier.name}</div>
                <div className="text-3xl font-bold mb-1">{tier.price}</div>
                <div className="text-sm opacity-60 mb-5">{tier.tagline}</div>
                <ul className="space-y-2 mb-4">
                  {tier.features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm"><span className="text-[#FF6A00] mt-0.5">✓</span><span>{f}</span></li>))}
                  {tier.notIncluded.map((f) => (<li key={f} className="flex items-start gap-2 text-sm opacity-30"><span className="mt-0.5">✗</span><span>{f}</span></li>))}
                </ul>
                <div className="rounded-2xl bg-[#F5F6F8] p-3 mb-5 space-y-2">
                  <p className="text-xs font-semibold opacity-60 mb-2">Real cases, similar profile:</p>
                  {CASE_SNIPPETS.slice(0, 2).map((c, i) => (
                    <div key={i} className={`rounded-xl border px-3 py-2 text-xs ${c.color}`}>
                      <div className="font-semibold mb-0.5">{c.role}</div>
                      <div className="opacity-80">{c.outcome}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => startCheckout(tier.plan)}
                className={["w-full rounded-xl px-5 py-3 font-semibold text-sm transition-all active:scale-95", tier.badge ? "bg-[#FF6A00] text-white hover:bg-[#e65f00] shadow-sm" : "bg-[#0F1C3F] text-white hover:opacity-90"].join(" ")}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm overflow-x-auto">
          <h3 className="text-sm font-semibold mb-4 opacity-70">Feature comparison</h3>
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="border-b border-[#0F1C3F]/10">
                <th className="text-left py-2 font-semibold opacity-60 w-1/2">Feature</th>
                <th className="py-2 text-center font-semibold">Mirror</th>
                <th className="py-2 text-center font-semibold text-[#FF6A00]">The Map</th>
                <th className="py-2 text-center font-semibold">Reckoning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F1C3F]/05">
              {[
                ["Diagnostic + profile match", true, true, true],
                ["Risk score (stay vs leave)", true, true, true],
                ["3-page report", true, true, true],
                ["Full decision framework", false, true, true],
                ["Scenario paths (3x)", false, true, true],
                ["Salary benchmarks", false, true, true],
                ["Leverage point analysis", false, true, true],
                ["Industry transition analysis", false, false, true],
                ["5-year trajectory projection", false, false, true],
                ["12-page comprehensive report", false, false, true],
              ].map(([label, m, map, r]) => (
                <tr key={label as string}>
                  <td className="py-2.5 opacity-75">{label as string}</td>
                  <td className="py-2.5 text-center">{m ? <span className="text-[#FF6A00]">✓</span> : <span className="opacity-20">—</span>}</td>
                  <td className="py-2.5 text-center">{map ? <span className="text-[#FF6A00] font-bold">✓</span> : <span className="opacity-20">—</span>}</td>
                  <td className="py-2.5 text-center">{r ? <span className="text-[#FF6A00]">✓</span> : <span className="opacity-20">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── REAL CASES ── */}
      <section id="real-cases" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-24">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Real Cases</h2>
          <p className="mt-1 opacity-70">Anonymised. Details blurred. Outcomes real.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CASE_SNIPPETS.map((c, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${c.color}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                <span className="text-xs font-bold uppercase tracking-wide">{c.tag}</span>
              </div>
              <div className="text-sm font-semibold mb-1">{c.role}</div>
              <div className="text-xs opacity-75 mb-2">{c.situation}</div>
              <div className="text-sm font-medium">{c.outcome}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">What people are saying</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { quote: "I'd been going back and forth for months. The Map gave me a framework I couldn't argue with.", name: "Software engineer, London" },
              { quote: "Expected it to be generic. It wasn't. The leverage analysis was uncomfortably accurate.", name: "Finance director, Singapore" },
              { quote: "Worth it just for the salary benchmarking alone. I was 18% below market and didn't know.", name: "Product manager, Toronto" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl bg-[#F5F6F8] p-5">
                <p className="text-sm opacity-80 italic mb-3">"{t.quote}"</p>
                <div className="text-xs font-semibold opacity-50">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-24">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-xl font-bold mb-2">Questions</h2>
          <p className="text-sm opacity-60 mb-6">Common objections, answered honestly.</p>
          <div className="divide-y divide-[#0F1C3F]/10">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-4">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold">
                  <span>{faq.q}</span>
                  <span className="shrink-0 text-[#FF6A00] text-lg leading-none">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="mt-3 text-sm opacity-70 leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGACY BRIEFS ── */}
      <section id="previews" className="mx-auto max-w-6xl px-6 pb-10 scroll-mt-24">
        <div className="flex items-end justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Research Briefs</h2>
          <p className="hidden text-sm opacity-70 md:block">Standalone 3–5 page briefs. Buy individually.</p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {briefs.map((p) => {
            const alreadyPurchased = !purchasedLoading && purchasedSlugs.includes(p.slug);
            return (
              <div key={p.id} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#F5F6F8]" />
                  <span className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">Preview</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm opacity-75">Full PDF opens only after purchase.</p>
                <button onClick={() => openPreview(p.slug, p.title)} className="mt-3 w-full rounded-xl border border-[#0F1C3F]/15 px-4 py-2 text-sm font-semibold hover:bg-[#F5F6F8]">Preview</button>
                <button onClick={() => checkoutSelected(p.slug)} disabled={purchasedLoading || alreadyPurchased}
                  className={["mt-3 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 font-semibold transition",
                    purchasedLoading ? "cursor-wait bg-[#0F1C3F]/50 text-white" : alreadyPurchased ? "cursor-not-allowed bg-[#0F1C3F]/70 text-white" : "bg-[#0F1C3F] text-white hover:opacity-95"].join(" ")}>
                  {purchasedLoading ? "Checking purchase…" : alreadyPurchased ? "Already purchased" : "Buy this brief – $7"}
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => (window.location.href = "/evaltree/select-briefs?plan=single")}
            className="inline-flex items-end justify-between gap-2 rounded-xl border border-[#FF6A00] bg-white px-6 py-3 text-sm font-semibold text-[#0F1C3F] transition hover:bg-[#FF6A00] hover:text-white hover:shadow-md">
            View more briefs →
          </button>
        </div>
      </section>

      <PreviewModal open={previewOpen} slug={previewSlug} title={previewTitle} onClose={closePreview} />

      {/* ── PRICING (legacy) ── */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-12 scroll-mt-24">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Pricing</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-sm opacity-70">Single Brief — $7 USD</div>
            <div className="mt-2 text-2xl font-semibold">Single Brief</div>
            <div className="mt-2 text-3xl font-semibold">$7 USD</div>
            <button onClick={() => { window.location.href = "/evaltree/select-briefs?plan=single"; }}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6A00] px-6 py-3 font-semibold text-white hover:bg-[#e65f00] hover:shadow-md active:scale-95 transition-all">
              Buy Single Brief – $7 USD
            </button>
            <p className="mt-2 text-xs opacity-70">Prices shown are exclusive of VAT.</p>
            <p className="mt-3 text-sm opacity-70">Includes one research brief of your choice. Delivered instantly.</p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-sm opacity-70">Five Briefs — $49 USD</div>
            <div className="mt-2 text-2xl font-semibold">Five Briefs</div>
            <div className="mt-2 text-3xl font-semibold">$49 USD</div>
            <button onClick={() => { if (!packEnabled) return; window.location.href = "/evaltree/select-briefs?plan=pack"; }} disabled={!packEnabled}
              className={["mt-6 inline-flex items-center w-full justify-center rounded-xl px-6 py-3 font-semibold transition-all",
                packEnabled ? "bg-white border border-[#FF6A00] text-[#0F1C3F] hover:bg-[#FF6A00] hover:text-white" : "cursor-not-allowed bg-gray-200 text-gray-400"].join(" ")}>
              Buy Five Briefs – $49 USD
            </button>
            <p className="mt-2 text-xs opacity-70">Prices shown are exclusive of VAT.</p>
            {!packEnabled && <p className="mt-3 text-sm opacity-70">The 5-brief bundle will be enabled when 5 briefs are available.</p>}
          </div>
        </div>

        {/* 48hr refund window */}
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold text-amber-800 mb-1">48-hour satisfaction review</p>
          <p className="text-xs text-amber-700">If your report failed to generate or was incorrectly matched, contact support within 48 hours of delivery and we'll investigate. Digital products are otherwise non-refundable per our Terms.</p>
        </div>

        <div className="mt-6 rounded-3xl border border-[#0F1C3F]/10 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold flex items-start justify-between">
            <h3>Important information</h3>
            <span className="shrink-0 rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">Not advice</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed opacity-80">
            Evaltree Insights are informational research briefs only and do not constitute legal, financial, or investment advice. Please read the{" "}
            <Link href="/evaltree/terms" className="font-medium underline underline-offset-4">Terms of Use / Terms of Purchase</Link>{" "}before buying.
          </p>
          <div className="mt-5 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
            <div className="text-sm font-semibold">Payments & delivery</div>
            <ul className="mt-2 space-y-2 text-sm opacity-80">
              <li>Payments processed securely by Crowbar Ltd.</li>
              <li>Transactions are handled by Stripe and delivered instantly upon payment.</li>
              <li>All purchases are non-refundable due to the digital nature of the product.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
