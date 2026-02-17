"use client";

export default function BriefPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          The 10-Minute Decision Brief
        </h1>

        <p className="text-lg opacity-80 mb-10">
          Before you make this call, read what most people miss.
        </p>

        <div className="bg-[#111827] p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-6">
            What You Get (In under 10 minutes)
          </h2>

          <ul className="space-y-3 text-lg opacity-90">
            <li>• What actually matters</li>
            <li>• What the consensus is getting wrong</li>
            <li>• Where the hidden risk sits</li>
            <li>• What changes next</li>
            <li>• The single sentence that reframes the decision</li>
          </ul>

          <div className="mt-10 border-t border-gray-800 pt-8">
            <p className="text-3xl font-bold mb-4">$7 — Instant Access</p>
            <p className="opacity-70 mb-6">
              Delivered immediately.
            </p>

            <button
              onClick={() => window.location.href = "https://buy.stripe.com/3cI3cu6mDdMk7dFaCZ7Vm0S"}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg"
            >
              Unlock the Decision Brief – $7
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
