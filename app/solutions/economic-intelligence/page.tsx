import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ArrowRight, TrendingUp, Briefcase, LineChart } from "lucide-react";
import { PUBLIC_INDICES } from "@/lib/data/indices";

const capabilities = [
  {
    icon: TrendingUp,
    title: "Macro Sentiment Tracking",
    body: "FX, subsidy reform, inflation, and purchasing-power shifts — read through the lens of real consumer and business discourse.",
  },
  {
    icon: Briefcase,
    title: "Sector Deep Dives",
    body: "Affordable housing, FMCG, digital lending, renewable energy. Structured intelligence for capital deployment decisions.",
  },
  {
    icon: LineChart,
    title: "Consumer Price Sensitivity",
    body: "Track how price changes ripple across regions and product categories before they become reputational or commercial risk.",
  },
];

export default function EconomicIntelligencePage() {
  const index = PUBLIC_INDICES[0];

  return (
    <>
      <PageHeader
        eyebrow="Strategic Pillar 03 // Economic & Sector"
        title="Economic & Market Intelligence"
        subtitle="Macro sentiment, sector deep dives, and price-sensitivity tracking for investors, corporate strategy teams, and foreign capital entering Nigeria."
        cta={{
          label: "Commission a Market Entry Study",
          href: "/contact",
        }}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl border border-[#2C3138] bg-[#181B1E]/80 p-7">
                <Icon className="w-6 h-6 text-[#D8A83E] mb-4" />
                <h2 className="font-heading font-bold text-lg mb-2">{c.title}</h2>
                <p className="font-body text-sm text-[#F5F5F2]/70 leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>

        {/* NCPI highlight */}
        <div className="mt-20 rounded-3xl border border-[#D8A83E]/30 bg-gradient-to-br from-[#202428] to-[#14171A] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-10 lg:p-14 space-y-6">
              <div className="font-mono text-xs text-[#D8A83E] uppercase tracking-widest">
                Featured Public Index
              </div>
              <h2 className="font-heading font-bold text-3xl tracking-tight">{index.title}</h2>
              <p className="font-body text-base text-[#F5F5F2]/75 leading-relaxed">{index.summary}</p>
              <div className="flex items-center gap-8">
                <div>
                  <div className="font-mono text-4xl font-bold text-[#D8A83E]">{index.currentValue}</div>
                  <div className="font-mono text-xs text-[#F5F5F2]/50 mt-1">Current Value</div>
                </div>
                <div>
                  <div className="font-mono text-lg font-semibold text-[#EF4444]">{index.changeValue}</div>
                  <div className="font-mono text-xs text-[#F5F5F2]/50 mt-1">vs Last Month</div>
                </div>
              </div>
              <ul className="space-y-2">
                {index.keyTakeaways.map((t) => (
                  <li key={t} className="flex items-start gap-2 font-body text-sm text-[#F5F5F2]/80">
                    <ArrowRight className="w-4 h-4 text-[#D8A83E] shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#14171A]/60 border-t lg:border-t-0 lg:border-l border-[#2C3138] p-10 lg:p-14">
              <div className="font-mono text-xs text-[#F5F5F2]/50 uppercase tracking-widest mb-8">
                6-Month Trajectory
              </div>
              <div className="flex items-end justify-between gap-2 h-48">
                {index.dataPoints.map((dp) => (
                  <div key={dp.label} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full flex items-end justify-center">
                      <div
                        className="w-full max-w-[28px] rounded-t bg-gradient-to-t from-[#B28322] to-[#D8A83E]"
                        style={{ height: `${(dp.value / 80) * 160}px` }}
                        title={`${dp.label}: ${dp.value}`}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-[#F5F5F2]/50">{dp.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}