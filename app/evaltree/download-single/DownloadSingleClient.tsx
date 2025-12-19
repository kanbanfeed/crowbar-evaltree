"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Brief = {
  id: string;
  title: string;
  slug: string;
  preview_url: string;
};

type Purchase = {
  id: string;
  plan: "single" | "pack";
  downloads_remaining: number;
  customer_email: string;
  status: "paid" | "refunded" | "canceled";
};

function Modal({
  open,
  title,
  message,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <h2 id="modal-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm opacity-80">{message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          {secondaryLabel && (
            <button
              onClick={onClose}
              className="rounded-xl border border-[#0F1C3F]/15 bg-white px-5 py-2.5 text-sm font-semibold transition hover:bg-[#F5F6F8]"
            >
              {secondaryLabel}
            </button>
          )}

          <a
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95"
          >
            {primaryLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DownloadSingleClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id") || "";

  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasedSlugs, setPurchasedSlugs] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalPrimaryLabel, setModalPrimaryLabel] = useState("Go to landing");
  const [modalPrimaryHref, setModalPrimaryHref] = useState("/evaltree");

  const purchaseReady = useMemo(() => purchase?.status === "paid", [purchase]);

  function showModal(args: {
    title: string;
    message: string;
    primaryLabel?: string;
    primaryHref?: string;
  }) {
    setModalTitle(args.title);
    setModalMessage(args.message);
    setModalPrimaryLabel(args.primaryLabel || "Go to landing");
    setModalPrimaryHref(args.primaryHref || "/evaltree");
    setModalOpen(true);
  }

  useEffect(() => {
    (async () => {
      try {
        if (!sessionId) {
          showModal({
            title: "Missing payment reference",
            message:
              "We couldn’t find your payment session. Please return to the landing page and complete checkout again.",
            primaryLabel: "Back to landing",
            primaryHref: "/evaltree",
          });
          setLoading(false);
          return;
        }

        // Verify purchase (DB + fallback logic should exist on your server)
        const vr = await fetch("/api/purchase/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (!vr.ok) {
          showModal({
            title: "Payment not verified yet",
            message:
              "Your payment is still being confirmed. Please wait a few seconds and refresh this page. If the issue continues, contact support.",
            primaryLabel: "Back to landing",
            primaryHref: "/evaltree",
          });
          setLoading(false);
          return;
        }

        const vj = await vr.json();
        setPurchase(vj.purchase);

        const pr = await fetch("/api/purchase/purchased-briefs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const pj = await pr.json();
        setPurchasedSlugs(pj.slugs || []);
        // Load briefs list
        const br = await fetch("/api/briefs", { cache: "no-store" });
        const bd = await br.json();
        setBriefs(bd.briefs || []);
      } catch {
        showModal({
          title: "Something went wrong",
          message:
            "We couldn’t load your download page. Please try again, or contact support if the issue continues.",
          primaryLabel: "Back to landing",
          primaryHref: "/evaltree",
        });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  async function handleDownload(slug: string) {
  const r = await fetch("/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, briefSlug: slug }),
  });

  const d = await r.json().catch(() => ({}));

  if (!r.ok) {
    const msg = String(d?.error || "").toLowerCase();

    if (r.status === 403 && msg.includes("download limit")) {
      showModal({
        title: "Download limit reached",
        message:
          "Your Single Brief purchase allows one brief download. To download another brief, please purchase an additional brief or upgrade to the five-brief pack.",
        primaryLabel: "Purchase on landing",
        primaryHref: "/#pricing",
      });
      return;
    }

    showModal({
      title: "Download unavailable",
      message:
        "We couldn’t start your download. Please try again, or contact support if the issue continues.",
      primaryLabel: "Back to landing",
      primaryHref: "/",
    });
    return;
  }

  //  If already purchased, still allow re-download (no payment again)
  if (d?.alreadyPurchased) {
    showModal({
      title: "Already purchased",
      message:
        "You’ve already purchased this brief. Your download will start now.",
      primaryLabel: "OK",
      primaryHref: "/evaltree",
    });
  }

  if (d?.url) {
    window.location.href = d.url; // /api/paid-download...
    return;
  }

  showModal({
    title: "Download unavailable",
    message:
      "We couldn’t start your download. Please try again, or contact support if the issue continues.",
    primaryLabel: "Back to landing",
    primaryHref: "/",
  });
}



  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        primaryLabel={modalPrimaryLabel}
        primaryHref={modalPrimaryHref}
        secondaryLabel="Close"
        onClose={() => setModalOpen(false)}
      />

      {/* Header */}
      <header>
        <div className="flex w-full items-center justify-end gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <a
              href="/evaltree"
              className="rounded-xl border border-[#ff6a00] bg-white px-4 py-2 text-sm font-semibold transition-transform transition-colors duration-150 ease-out hover:bg-[#ff6a00] hover:text-white hover:shadow-md active:bg-[#e65f00] active:text-white active:scale-95 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]"
            >
              Back to landing
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F8] px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
            <span className="opacity-80">Purchase confirmed</span>
          </div>

          <h1 className="mt-5 text-2xl font-semibold md:text-3xl">
            Thank you for your purchase.
          </h1>

          <p className="mt-3 text-base opacity-80">
            Download your Evaltree Insights by Crowbar brief(s) below:
          </p>

          {/* Instruction */}
          <div className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
            <p className="text-sm font-medium">
              If you purchase the Single Brief option, you may download one brief of your choice from the available list.
            </p>
            <p className="mt-2 text-sm opacity-80">
              If you meant to purchase Five Briefs, return to the landing page to choose the correct option.
            </p>
          </div>

          {/* Compliance disclaimers */}
          <div className="mt-4 text-xs opacity-70">
            <div>Payments processed securely by Crowbar Ltd.</div>
            <div>Transactions are handled by Stripe and delivered instantly upon payment.</div>
            <div>All purchases are non-refundable due to the digital nature of the product.</div>
          </div>

          {/* Loading state (keeps your UI intact) */}
          {loading && (
            <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-4 text-sm opacity-80">
              Loading your briefs…
            </div>
          )}

          {/* List */}
          {!loading && (
  <ul className="mt-6 space-y-3">
    {briefs.map((p) => {
      const alreadyPurchased = purchasedSlugs.includes(p.slug); //  define here

      return (
        <li
          key={p.id}
          className="flex items-center justify-between gap-3 rounded-2xl bg-[#F5F6F8] p-4"
        >
          <span className="flex-1 min-w-0 font-medium">{p.title}</span>

          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() => handleDownload(p.slug)}
              className={[
                "shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold text-white transition-transform transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]",
                alreadyPurchased
                  ? "bg-[#0F1C3F] hover:opacity-95 focus-visible:ring-[#0F1C3F]"
                  : "bg-[#FF6A00] hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95 active:translate-y-[1px] focus-visible:ring-[#FF6A00]",
              ].join(" ")}
            >
              {alreadyPurchased ? "Download Again" : "Download PDF"}
            </button>

            {alreadyPurchased && (
              <div className="text-xs opacity-70">
                You have already purchased this PDF.
              </div>
            )}
          </div>
        </li>
      );
    })}
  </ul>
)}


          {/* Support */}
          <div className="mt-8">
            <p className="text-sm opacity-80">
              For support, contact:{" "}
              <a
                className="font-medium underline underline-offset-4"
                href="mailto:support@crowbarltd.com"
              >
                support@crowbarltd.com
              </a>
              .
            </p>
          </div>

          {/* Footer line */}
          <div className="mt-8 border-t border-[#0F1C3F]/10 pt-5 text-sm opacity-70">
            © Crowbar Ltd 2025. Evaltree Insights by Crowbar.
          </div>
        </div>
      </div>
    </main>
  );
}
