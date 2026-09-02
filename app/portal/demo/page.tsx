"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { NIGERIA_GEOPOLITICAL_ZONES } from "@/lib/data/geopolitical-zones";
import { SAMPLE_DOSSIERS } from "@/lib/data/sample-dossiers";

const ZONE_CARD_STYLE = "rounded-lg font-mono text-[10px]";

function SentimentBand({ score }: { score: number }) {
  const color =
    score >= 55
      ? "rgb(var(--positive))"
      : score >= 45
      ? "rgb(var(--gold))"
      : "rgb(var(--negative))";
  return (
    <div
      className="h-1.5 rounded-full"
      style={{ width: `${score}%`, backgroundColor: color }}
    />
  );
}

export default function DemoTerminalPage() {
  const [activeDossier, setActiveDossier] = useState("fmcg");
  const dossier = SAMPLE_DOSSIERS[activeDossier as keyof typeof SAMPLE_DOSSIERS];

  return (
    <>
      <PageHeader
        eyebrow="Interactive Preview"
        title="Intelligence Terminal"
        subtitle="A read-only preview of the continuous intelligence workspace offered to enterprise retainers. Explore narratives, zones, and sentiment in real time."
      />

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dossier Selector */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Object.entries(SAMPLE_DOSSIERS).map(([key, d]) => (
            <button
              key={key}
              onClick={() => setActiveDossier(key)}
              className={`px-4 py-2 rounded-lg font-mono text-xs transition-all border ${
                activeDossier === key
                  ? "bg-gold/15 border-gold text-gold"
                  : "bg-surface border-border text-foreground/70 hover:border-gold/50"
              }`}
            >
              {d.sector}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: dossier meta + summary */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/80 p-8">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-positive animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-wider text-gold uppercase">
                  {dossier.classification}
                </span>
              </div>
              <span className="font-mono text-xs text-foreground/50">
                {dossier.date} // {dossier.sector}
              </span>
            </div>

            <div className="mb-2 font-mono text-xs text-foreground/50">
              TARGET ENTITY: <span className="text-gold">{dossier.targetEntity}</span>
            </div>

            <h2 className="font-heading font-bold text-2xl mb-6">Executive Summary</h2>
            <ul className="space-y-3 mb-8">
              {dossier.executiveSummary.map((s, idx) => (
                <li key={idx} className="flex items-start gap-3 font-body text-sm text-foreground/85">
                  <span className="font-mono text-[10px] text-gold mt-1">0{idx + 1}</span>
                  {s}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="inset-panel p-4">
                <div className="font-mono text-[10px] text-gold uppercase tracking-wider mb-2">
                  Key Shift
                </div>
                <p className="font-body text-sm text-foreground/85">{dossier.keyShift}</p>
              </div>
              <div className="inset-panel p-4">
                <div className="font-mono text-[10px] text-gold uppercase tracking-wider mb-2">
                  Dominant Narrative
                </div>
                <p className="font-body text-sm text-foreground/85">{dossier.dominantNarrative}</p>
              </div>
            </div>

            {/* Health score */}
            <div className="inset-panel p-5">
              <div className="flex justify-between font-mono text-xs text-foreground/60 mb-3">
                <span className="uppercase tracking-wider">Brand &amp; Perception Health</span>
                <span>
                  {dossier.healthScore.positive}% POS / {dossier.healthScore.neutral}% NEU /{" "}
                  {dossier.healthScore.negative}% NEG
                </span>
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-card border border-border">
                <div style={{ width: `${dossier.healthScore.positive}%` }} className="bg-positive" />
                <div style={{ width: `${dossier.healthScore.neutral}%` }} className="bg-neutral" />
                <div style={{ width: `${dossier.healthScore.negative}%` }} className="bg-negative" />
              </div>
            </div>
          </div>

          {/* Right: regional sentiment */}
          <div className="rounded-2xl border border-border bg-surface/80 p-8">
            <div className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-6">
              Geopolitical Sentiment
            </div>
            <div className="space-y-5">
              {dossier.regionalSentiment.map((r) => {
                const zone = NIGERIA_GEOPOLITICAL_ZONES.find((z) => z.name.startsWith(r.zone));
                return (
                  <div key={r.zone} className="pb-5 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`${ZONE_CARD_STYLE} text-gold font-semibold`}>
                        {r.zone}
                      </span>
                      <span className="font-mono text-xs font-bold text-foreground">{r.score}</span>
                    </div>
                    <SentimentBand score={r.score} />
                    <p className="font-body text-xs text-foreground/65 mt-2 leading-relaxed">
                      {r.narrative}
                    </p>
                    {zone && (
                      <p className="font-mono text-[10px] text-foreground/35 mt-1">
                        States: {zone.states.join(", ")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 inset-panel p-4">
              <div className="font-mono text-[10px] text-gold uppercase tracking-wider mb-2">
                Prescribed Strategic Action
              </div>
              <p className="font-body text-sm text-foreground/85 leading-relaxed">
                {dossier.recommendedAction}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}