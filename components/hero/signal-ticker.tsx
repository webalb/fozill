import React from "react";
import Link from "next/link";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface TickerSignalItem {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  loc: string;
}

interface SignalTickerProps {
  signals?: TickerSignalItem[];
}

const DEFAULT_SIGNALS: TickerSignalItem[] = [
  { id: "def-1", label: "EMERGING MKT SENTIMENT", value: "Price Resistance ↑ 18%", trend: "up", loc: "Global" },
  { id: "def-2", label: "LAGOS METRO", value: "61% Positive", trend: "up", loc: "Nigeria" },
  { id: "def-3", label: "FINTECH DISPUTES", value: "POS Settlement Inquiries ↑ 31%", trend: "up", loc: "Global" },
  { id: "def-4", label: "DIASPORA DISCOURSE", value: "68% Remittance-tax focused", trend: "neutral", loc: "Global" },
  { id: "def-5", label: "2027 PERCEPTION RADAR", value: "14 Bot Clusters Identified", trend: "down", loc: "Abuja FCT" },
  { id: "def-6", label: "E-MOBILITY SIGNALS", value: "EV Adopter Sentiment ↑ 24%", trend: "up", loc: "Global" },
];

export function SignalTicker({ signals }: SignalTickerProps) {
  const displaySignals = signals && signals.length > 0 ? signals : DEFAULT_SIGNALS;

  return (
    <div className="w-full bg-card border-y border-border overflow-hidden py-2.5 relative group">
      {/* Visual Accent Glow on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        <Link
          href="/signals"
          className="flex items-center gap-2 pl-4 pr-6 shrink-0 border-r border-border z-20 bg-card hover:text-gold transition-colors"
          title="Explore live public signal stream"
        >
          <span className="flex h-2 w-2 rounded-full bg-gold animate-ping" />
          <span className="font-mono text-[11px] font-bold text-gold uppercase tracking-wider">
            LIVE SIGNALS
          </span>
        </Link>

        <div className="flex items-center gap-8 animate-ticker whitespace-nowrap pl-4 group-hover:[animation-play-state:paused]">
          {[...displaySignals, ...displaySignals].map((sig, idx) => (
            <Link
              key={`${sig.id}-${idx}`}
              href="/signals"
              className="inline-flex items-center gap-2 text-xs font-mono text-foreground/90 hover:text-gold transition-colors cursor-pointer"
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}