"use client";

export default function Checkout7() {
  async function startCheckout() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: "49",
        email: "test@evaltree.com",
        briefSlugs: ["startup-valuation-2026"],
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-white">
      <button
        onClick={startCheckout}
        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg"
      >
        Continue to Secure Checkout – $7
      </button>
    </div>
  );
}
