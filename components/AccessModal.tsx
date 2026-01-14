"use client";

type AccessModalProps = {
  open: boolean;
  sessionId: string;
  slug: string | null;
  title: string;
  onClose: () => void;
};

export default function AccessModal({
  open,
  sessionId,
  slug,
  title,
  onClose,
}: AccessModalProps) {
  if (!open || !slug || !sessionId) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-6xl h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-sm font-semibold text-[#0F1C3F]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-1.5 text-sm font-semibold hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        {/* PDF VIEW — INLINE ONLY */}
        <iframe
          src={`/api/paid-view?session_id=${encodeURIComponent(
            sessionId
          )}&slug=${encodeURIComponent(slug)}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full"
          title="Full PDF"
        />
      </div>
    </div>
    </>
  );
}
