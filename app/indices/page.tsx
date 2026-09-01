import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { PUBLIC_INDICES } from "@/lib/data/indices";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function IndicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Public Intelligence"
        title="Nigeria Indices & Data Snapshots"
        subtitle="Free, recurring intelligence published for executives and investors. A taste of the analytical rigor we deliver on retainer."
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLIC_INDICES.map((index) => {
            const DirectionIcon =
              index.changeDirection === "up"
                ? TrendingUp
                : index.changeDirection === "down"
                ? TrendingDown
                : Minus;
            const directionColor =
              index.changeDirection === "up"
                ? "text-[#EF4444]"
                : index.changeDirection === "down"
                ? "text-[#10B981]"
                : "text-[#8E95A2]";
            return (
              <div
                key={index.id}
                className="rounded-2xl border border-[#2C3138] bg-[#181B1E]/80 p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D8A83E] bg-[#D8A83E]/10 border border-[#D8A83E]/30 px-2 py-1 rounded">
                    {index.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#F5F5F2]/40">{index.date}</span>
                </div>
                <h2 className="font-heading font-bold text-lg mb-3">{index.title}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-3xl font-bold text-[#D8A83E]">
                    {index.currentValue}
                  </span>
                  <span className={`font-mono text-sm font-semibold ${directionColor} flex items-center gap-1`}>
                    <DirectionIcon className="w-4 h-4" />
                    {index.changeValue}
                  </span>
                </div>
                <p className="font-body text-sm text-[#F5F5F2]/70 leading-relaxed mb-6 flex-grow">
                  {index.summary}
                </p>
                <ul className="space-y-2 mb-6">
                  {index.keyTakeaways.slice(0, 2).map((t) => (
                    <li key={t} className="flex items-start gap-2 font-body text-xs text-[#F5F5F2]/75">
                      <ArrowRight className="w-3.5 h-3.5 text-[#D8A83E] shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-[#D8A83E] hover:text-[#F3CB6C] transition-colors"
                >
                  Get the full index <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}