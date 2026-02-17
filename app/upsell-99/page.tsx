"use client";

export default function Upsell99() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xl text-center space-y-6">

        <h1 className="text-3xl font-bold">
          Add Decision Memo – $99
        </h1>

        <p className="text-gray-600">
          Executive breakdown + Business Planner bonus.
        </p>

      <div className="flex flex-col items-center gap-4 mt-6">

       <button
         onClick={() => window.location.href = "https://buy.stripe.com/eVqaEWaCTfUsdC39yV7Vm0U"}
         className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
       >
         Decision Memo ($99)
       </button>

       <button
         onClick={() => window.location.href = "/thank-you"}
         className="text-gray-500 underline"
       >
         Skip
       </button>

     </div>

      </div>
    </main>
  );
}
