export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1220] text-white">

      {/* HERO SECTION */}
      <section className="px-10 py-24 max-w-6xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          What smart operators read when they can’t afford to be wrong.
        </h1>

        <p className="text-lg md:text-xl opacity-80 max-w-3xl mb-10">
          10-minute decision briefs that remove false certainty before capital,
          hiring, valuation, or geopolitical exposure.
        </p>

        <div className="flex gap-6 items-center">
          <a
            href="/topics"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold"
          >
            Read a $7 Decision Brief
          </a>

          <a
            href="/topics"
            className="text-white opacity-70 hover:opacity-100"
          >
            Browse Topics →
          </a>
        </div>

      </section>

      {/* TRUST STRIP */}
      <section className="border-t border-white/10 border-b border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-10 text-sm opacity-70">
          Used by: Founders • Operators • Investors • Professionals • Senior Employees • Policy Advisors
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="px-10 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Most bad decisions don’t come from ignorance. <br/>
          They come from false certainty.
        </h2>

        <p className="text-lg opacity-80 mb-6 max-w-3xl">
          You don’t lose money because you didn’t read enough.  
          You lose money because you trusted the wrong assumption.
        </p>

        <ul className="space-y-2 text-lg opacity-80">
          <li>• What most people misjudge</li>
          <li>• What breaks first</li>
          <li>• What looks safe but isn’t</li>
          <li>• Where the narrative hides structural risk</li>
        </ul>

        <p className="mt-6 text-lg opacity-90">
          This is not research. This is decision protection.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-10 pb-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">How it works</h2>

        <div className="space-y-3 text-lg opacity-80">
          <p>1. Choose a topic</p>
          <p>2. Read the first 100 words free</p>
          <p>3. Unlock the 10-minute Decision Brief for $7</p>
          <p>4. Upgrade if the decision actually matters</p>
        </div>
      </section>

    </main>
  );
}
