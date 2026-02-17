"use client";

export default function TopicsPage() {
  const topics = [
    {
      title: "Startup Valuation 2026",
      preview:
        "Most startup valuations are not wrong because the math is bad. They’re wrong because the assumptions are outdated. Growth is no longer rewarded the way it was in 2021. Liquidity timelines have stretched. Capital now prices patience differently. If you’re still benchmarking against peak-cycle multiples, you’re not optimistic — you’re misaligned with reality."
    },
    {
      title: "AI Safety 2026",
      preview:
        "AI risk is not just about regulation. It’s about deployment speed outpacing human oversight. Organizations are integrating systems faster than they understand second-order effects. The danger isn’t the model — it’s misplaced confidence in how it’s used."
    },
    {
      title: "Capital Allocation 2022–2026",
      preview:
        "Capital is no longer cheap, and mistakes are now expensive. Decisions made during zero-interest eras are colliding with a new financial reality. Companies that once scaled on momentum now face discipline cycles that expose structural fragility."
    },
    {
      title: "Hiring & Talent Economics",
      preview:
        "Hiring decisions made during expansion cycles often create hidden liabilities. Compensation inflation, role duplication, and unclear ownership lines slowly erode operational clarity. What looks like growth can quietly become inefficiency."
    },
    {
      title: "Geopolitics & Supply Chain Exposure",
      preview:
        "Supply chains now carry political risk as much as logistical risk. Trade dependencies, sanctions, and regional instability introduce pressure points that don’t show up in traditional planning models. Exposure builds quietly until disruption hits."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Decision Topics</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic, i) => (
          <div
            key={i}
            className="bg-[#1e293b] p-6 rounded-xl border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4">{topic.title}</h2>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {topic.preview}
            </p>

             <button
                onClick={() => window.location.href = "/brief"}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold">
                   Read the $7 Decision Brief
             </button>

          </div>
        ))}
      </div>
    </main>
  );
}
