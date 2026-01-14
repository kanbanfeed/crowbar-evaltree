"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AccessModal from "@/components/AccessModal";
type Brief = {
  id: string;
  title: string;
  slug: string;
};

export default function ThankYouClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id") || "";

  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);

  // Preview modal state (ACCESS button)
  const [accessOpen, setAccessOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState("");

  // Auto-download only once
  const autoDownloadStarted = useRef(false);

  /* ---------------- Load session briefs ---------------- */
  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        // 1️⃣ Verify payment
        const vr = await fetch("/api/purchase/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (!vr.ok) throw new Error("Payment not verified");

        // 2️⃣ Fetch ONLY briefs for THIS session
        const br = await fetch("/api/purchase/session-briefs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const bd = await br.json();
        setBriefs(bd.briefs || []);

        // 3️⃣ Auto-download first brief once (optional)
        if (!autoDownloadStarted.current && bd?.briefs?.length > 0) {
          autoDownloadStarted.current = true;
          startDownload(bd.briefs[0].slug);
        }
      } catch {
        // Silent fail – user can still manually download
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  /* ---------------- Download ---------------- */
  function startDownload(slug: string) {
    window.location.href = `/api/paid-download?session_id=${encodeURIComponent(
      sessionId
    )}&slug=${encodeURIComponent(slug)}`;
  }

  /* ---------------- Access (view) ---------------- */
  function openAccess(slug: string, title: string) {
     setActiveSlug(slug);
    setActiveTitle(title);
    setAccessOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
      {/* Header */}
      <header className="flex justify-end px-6 py-4">
        <Link
          href="/evaltree"
          className="rounded-xl border border-[#FF6A00] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#FF6A00] hover:text-white"
        >
          Back to landing
        </Link>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F8] px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
            <span className="opacity-80">Payment confirmed</span>
          </div>

          <h1 className="mt-5 text-2xl font-semibold md:text-3xl">
            Thank you for your purchase.
          </h1>

          <p className="mt-3 text-base opacity-80">
            Your PDF download will start automatically. If it doesn’t, use the
            button below.
          </p>

          {loading && (
            <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-4 text-sm opacity-80">
              Loading your briefs…
            </div>
          )}

          {/* Purchased briefs – SESSION ONLY */}
          {!loading && (
            <ul className="mt-6 space-y-3">
              {briefs.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-[#F5F6F8] p-4"
                >
                  <span className="font-medium">{b.title}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startDownload(b.slug)}
                      className="rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e65f00]"
                    >
                      Download
                    </button>

                    <button
                      onClick={() => openAccess(b.slug, b.title)}
                      className="rounded-xl border border-[#0F1C3F]/20 bg-white px-4 py-2 text-sm font-semibold hover:bg-[#F5F6F8]"
                    >
                     View Brief
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Browse more */}
          <div className="mt-6">
            <Link
              href="/evaltree/select-briefs?plan=single"
              className="inline-flex items-center justify-center rounded-xl border border-[#0F1C3F]/15 bg-white px-6 py-3 font-semibold hover:bg-[#F5F6F8]"
            >
              Browse other briefs
            </Link>
          </div>

          {/* Email delivery */}
          <div className="mt-6 rounded-2xl border border-[#0F1C3F]/10 bg-[#F5F6F8] p-5">
            <div className="text-sm font-semibold">Email delivery</div>
            <p className="mt-2 text-sm opacity-80">
              A purchase confirmation and download access is sent to your email
              after payment. Please check spam/junk as well.
            </p>
          </div>

          {/* Legal */}
          <div className="mt-6 text-xs opacity-70 space-y-1">
            <div>Payments processed securely by Crowbar Ltd.</div>
            <div>Transactions are handled by Stripe and delivered instantly upon payment.</div>
            <div>All purchases are non-refundable due to the digital nature of the product.</div>
          </div>

          {/* Support */}
          <div className="mt-6 text-sm opacity-80">
            For support, contact{" "}
            <a
              href="mailto:support@crowbarltd.com"
              className="font-medium underline underline-offset-4"
            >
              support@crowbarltd.com
            </a>
            .
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-[#0F1C3F]/10 pt-5 text-sm opacity-70">
            © Crowbar Ltd 2025. Evaltree Insights by Crowbar.
          </div>
        </div>
      </div>

      {/* Access Modal (FULL PDF, SAME PAGE) */}
      <AccessModal
          open={accessOpen}
          sessionId={sessionId}
          slug={activeSlug}
          title={activeTitle}
          onClose={() => setAccessOpen(false)}
        />
    </main>
  );
}



// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// type Purchase = {
//   id: string;
//   plan: "single" | "pack";
//   downloads_remaining: number;
//   customer_email: string;
//   status: "paid" | "refunded" | "canceled";
// };

// function Modal({
//   open,
//   title,
//   message,
//   primaryLabel,
//   primaryHref,
//   secondaryLabel,
//   onClose,
// }: {
//   open: boolean;
//   title: string;
//   message: string;
//   primaryLabel: string;
//   primaryHref: string;
//   secondaryLabel?: string;
//   onClose: () => void;
// }) {
//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center px-6"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-title"
//     >
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//       <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
//         <h2 id="modal-title" className="text-lg font-semibold">
//           {title}
//         </h2>
//         <p className="mt-2 text-sm opacity-80">{message}</p>

//         <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
//           {secondaryLabel && (
//             <button
//               onClick={onClose}
//               className="rounded-xl border border-[#0F1C3F]/15 bg-white px-5 py-2.5 text-sm font-semibold transition hover:bg-[#F5F6F8]"
//             >
//               {secondaryLabel}
//             </button>
//           )}

//           <a
//             href={primaryHref}
//             className="inline-flex items-center justify-center rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e65f00] hover:shadow-md active:bg-[#cc5400] active:scale-95"
//           >
//             {primaryLabel}
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ThankYouClient() {
//   const sp = useSearchParams();
//   const sessionId = sp.get("session_id") || "";
//   // slug kept because your flow may still pass it; we just won't download anymore.
//   const slug = sp.get("slug") || "";

//   const [purchase, setPurchase] = useState<Purchase | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalPrimaryLabel, setModalPrimaryLabel] = useState("Back to landing");
//   const [modalPrimaryHref, setModalPrimaryHref] = useState("/evaltree");

//   const purchaseReady = useMemo(() => purchase?.status === "paid", [purchase]);

//   function showModal(args: {
//     title: string;
//     message: string;
//     primaryLabel?: string;
//     primaryHref?: string;
//   }) {
//     setModalTitle(args.title);
//     setModalMessage(args.message);
//     setModalPrimaryLabel(args.primaryLabel || "Back to landing");
//     setModalPrimaryHref(args.primaryHref || "/evaltree");
//     setModalOpen(true);
//   }

//   useEffect(() => {
//     (async () => {
//       try {
//         if (!sessionId) {
//           showModal({
//             title: "Missing payment reference",
//             message:
//               "We couldn’t find your payment session. Please return to the landing page and try again.",
//             primaryLabel: "Back to landing",
//             primaryHref: "/evaltree",
//           });
//           setLoading(false);
//           return;
//         }

//         const vr = await fetch("/api/purchase/verify", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ sessionId }),
//         });

//         if (!vr.ok) {
//           showModal({
//             title: "Payment not verified yet",
//             message:
//               "Your payment is still being confirmed. Please wait a few seconds and refresh this page. If the issue continues, contact support.",
//             primaryLabel: "Back to landing",
//             primaryHref: "/evaltree",
//           });
//           setLoading(false);
//           return;
//         }

//         const vj = await vr.json();
//         setPurchase(vj.purchase);
//       } catch {
//         showModal({
//           title: "Something went wrong",
//           message:
//             "We couldn’t load your thank-you page. Please try again, or contact support if the issue continues.",
//           primaryLabel: "Back to landing",
//           primaryHref: "/evaltree",
//         });
//       } finally {
//         setLoading(false);
//       }
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sessionId, slug]);

//   return (
//     <main className="min-h-screen bg-[#F5F6F8] text-[#0F1C3F]">
//       <Modal
//         open={modalOpen}
//         title={modalTitle}
//         message={modalMessage}
//         primaryLabel={modalPrimaryLabel}
//         primaryHref={modalPrimaryHref}
//         secondaryLabel="Close"
//         onClose={() => setModalOpen(false)}
//       />

//       <header>
//         <div className="flex w-full items-center justify-end gap-4 px-6 py-4">
//           <Link
//             href="/"
//             className="rounded-xl border border-[#ff6a00] bg-white px-4 py-2 text-sm font-semibold transition-transform transition-colors duration-150 ease-out hover:bg-[#ff6a00] hover:text-white hover:shadow-md active:bg-[#e65f00] active:text-white active:scale-95 active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6a00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F8]"
//           >
//             Back to landing
//           </Link>
//         </div>
//       </header>

//       <div className="mx-auto max-w-4xl px-6 py-10">
//         <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
//           <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F6F8] px-4 py-2 text-sm">
//             <span className="h-2 w-2 rounded-full bg-[#FF6A00]" />
//             <span className="opacity-80">
//               {purchaseReady ? "Payment confirmed" : "Confirming payment"}
//             </span>
//           </div>

//           <h1 className="mt-5 text-2xl font-semibold md:text-3xl">
//             Thank you for your purchase of Evaltree Insights.
//           </h1>

//           <div className="mt-4 text-base opacity-90 space-y-4">
//             <p>
//               We’re writing to let you know that your selected brief(s) are currently
//               undergoing final compliance and quality verification. This is part of our
//               commitment to ensuring that all Evaltree content meets required legal,
//               licensing, and disclosure standards.
//             </p>

//             <p>Your brief(s) will be delivered to you shortly. <b>No action is required</b> from your side.</p>

//             <p>
//               If you have any questions in the meantime, you can reach us at{" "}
//               <a
//                 className="font-medium underline underline-offset-4"
//                 href="mailto:support@crowbarltd.com"
//               >
//                 support@crowbarltd.com
//               </a>
//               , and our team will be happy to assist.
//             </p>

//             <p>
//               Thank you for your patience and for being an early supporter of Evaltree Insights.
//             </p>
//           </div>

//           {loading && (
//             <div className="mt-6 rounded-2xl bg-[#F5F6F8] p-4 text-sm opacity-80">
//               Loading…
//             </div>
//           )}

//           <div className="mt-8 border-t border-[#0F1C3F]/10 pt-5 text-sm opacity-70">
//             © Crowbar Ltd 2025. Evaltree Insights by Crowbar.
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
