"use client";

import Link from "next/link";

type PreviewModalProps = {
  open: boolean;
  slug: string | null;
  title: string;
  onClose: () => void;
};

export default function PreviewModal({
  open,
  slug,
  title,
  onClose,
}: PreviewModalProps) {
  if (!open || !slug) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Preview modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#0F1C3F]/10 p-4">
          <div className="text-sm font-semibold">{title}</div>
          <button
            onClick={onClose}
            className="rounded-xl border border-[#0F1C3F]/15 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-[#F5F6F8]"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="relative">
          <object
            data={`/api/preview-download?slug=${encodeURIComponent(slug)}#toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
            className="h-[75vh] w-full"
          >
            <p>PDF preview not supported.</p>
          </object>

          {/* Fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent" />

          {/* CTA */}
          <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-2 px-4">
            <div className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs font-medium opacity-80">
              Preview ends here
            </div>

            <Link
              href="/.#pricing"
              onClick={onClose}
              className="rounded-xl bg-[#FF6A00] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Go to Pricing to unlock full PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}