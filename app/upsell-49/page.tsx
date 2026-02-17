 "use client";

export default function Upsell49() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xl text-center space-y-6">

        <h1 className="text-3xl font-bold">
          Add Misjudgment Layer – $49
        </h1>

        <p className="text-gray-600">
          Understand where the decision goes wrong.
        </p>

     <div className="flex flex-col items-center gap-4 mt-6">

       <button
         onClick={() => window.location.href = "https://buy.stripe.com/fZuaEW7qH5fOgOf8uR7Vm0T"}
         className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
       >
         Add decoding ($49)
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
