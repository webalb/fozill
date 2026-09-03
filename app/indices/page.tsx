import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { PUBLIC_INDICES } from "@/lib/data/indices";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function IndicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Public Intelligence"
        title="Global Indices & Data Snapshots"
        subtitle="Free, recurring intelligence published for executives and investors. A taste of the analytical rigor we deliver on retainer — starting with our flagship Nigeria desk, expanding globally."
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
                ? "text-negative"
                : index.changeDirection === "down"
                ? "text-positive"
                : "text-neutral";
            return (
              <div
                key={index.id}
                className="rounded-2xl border border-border bg-surface/80 p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="gold-chip">
                    {index.category}
                  </span>
                  <span className="font-mono text-[10px] text-foreground/40">{index.date}</span>
                </div>
                <h2 className="font-heading font-bold text-lg mb-3">{index.title}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-3xl font-bold text-gold">
                    {index.currentValue}
                  </span>
                  <span className={`font-mono text-sm font-semibold ${directionColor} flex items-center gap-1`}>
                    <DirectionIcon className="w-4 h-4" />
                    {index.changeValue}
                  </span>
                </div>
                <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6 flex-grow">
                  {index.summary}
                </p>
                <ul className="space-y-2 mb-6">
                  {index.keyTakeaways.slice(0, 2).map((t) => (
                    <li key={t} className="flex items-start gap-2 font-body text-xs text-foreground/75">
                      <ArrowRight className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="link-gold"
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