import React from "react";
import { TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function SignalTicker() {
  const signals = [
    { label: "FMCG SENSITIVITY", value: "Price Resistance ↑ 18%", trend: "up", loc: "NW Corridors" },
    { label: "LAGOS METRO SENTIMENT", value: "61% Positive", trend: "up", loc: "South-West" },
    { label: "FINTECH DISPUTES", value: "POS Settlement Inquiries ↑ 31%", trend: "up", loc: "Nationwide" },
    { label: "NORTHERN BROADCAST", value: "Hausa Radio Discourse 68% Subsidy-focused", trend: "neutral", loc: "Kano / Kaduna" },
    { label: "2027 PERCEPTION RADAR", value: "14 Bot Clusters Identified", trend: "down", loc: "Abuja FCT" },
    { label: "PORT HARCOURT COMMERCE", value: "Retail Sachet Volume Demand ↑ 24%", trend: "up", loc: "South-South" },
  ];

  return (
    <div className="w-full bg-card border-y border-border overflow-hidden py-2.5 relative">
      {/* Visual Accent Glow on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        <div className="flex items-center gap-2 pl-4 pr-6 shrink-0 border-r border-border z-20 bg-card">
          <span className="flex h-2 w-2 rounded-full bg-gold animate-ping" />
          <span className="font-mono text-[11px] font-bold text-gold uppercase tracking-wider">
            LIVE SIGNALS
          </span>
        </div>

        <div className="flex items-center gap-8 animate-ticker whitespace-nowrap pl-4">
          {[...signals, ...signals].map((sig, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 text-xs font-mono text-foreground/90"
            >
              <span className="px-1.5 py-0.5 rounded bg-elevated text-gold text-[10px] font-semibold border border-border">
                {sig.label}
              </span>
              <span className="text-foreground font-medium">{sig.value}</span>
              <span className="text-foreground/40 text-[10px] flex items-center gap-0.5">
                ({sig.loc})
              </span>
              {sig.trend === "up" ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-positive" />
              ) : sig.trend === "down" ? (
                <ArrowDownRight className="w-3.5 h-3.5 text-negative" />
              ) : (
                <TrendingUp className="w-3.5 h-3.5 text-neutral" />
              )}
              <span className="text-border mx-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}