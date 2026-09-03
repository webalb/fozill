"use client";

import { TrendingUp, Users, Compass, ShieldCheck, Map } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface RegionalSentiment {
  zone: string;
  score: number;
  status: "positive" | "neutral" | "negative";
  narrative: string;
}

interface DossierProps {
  classification: string;
  targetEntity: string;
  healthScore: { positive: number; neutral: number; negative: number };
  keyShift: string;
  dominantNarrative: string;
  topGeographies: string[];
  recommendedAction: string;
  trend: { label: string; value: number }[];
  regionalSentiment: RegionalSentiment[];
}

const zoneShort: Record<string, string> = {
  "North-West": "NW",
  "North-East": "NE",
  "North-Central": "NC",
  "South-West": "SW",
  "South-East": "SE",
  "South-South": "SS",
};

function statusColor(status: "positive" | "neutral" | "negative") {
  return status === "positive"
    ? "rgb(var(--positive))"
    : status === "negative"
    ? "rgb(var(--negative))"
    : "rgb(var(--gold))";
}

export function DossierCard({
  classification,
  targetEntity,
  healthScore,
  keyShift,
  dominantNarrative,
  topGeographies,
  recommendedAction,
  trend,
  regionalSentiment,
}: DossierProps) {
  return (
    <div className="relative rounded-xl border border-border bg-surface/90 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-gold uppercase">
            {classification}
          </span>
        </div>
        <span className="font-mono text-xs text-foreground/50">TARGET: {targetEntity}</span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs font-mono text-foreground/60 mb-2">
          <span className="font-heading uppercase tracking-wide">Brand &amp; Perception Health</span>
          <span className="text-foreground">
            {healthScore.positive}% POS / {healthScore.neutral}% NEU / {healthScore.negative}% NEG
          </span>
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-elevated border border-border">
          <div style={{ width: `${healthScore.positive}%` }} className="bg-positive" />
          <div style={{ width: `${healthScore.neutral}%` }} className="bg-neutral" />
          <div style={{ width: `${healthScore.negative}%` }} className="bg-negative" />
        </div>
      </div>

      {/* Trend chart */}
      <div className="mt-6 rounded-lg border border-border bg-elevated/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-heading font-semibold text-gold flex items-center gap-1.5 uppercase tracking-wide">
            <TrendingUp className="h-3.5 w-3.5" />
            Signal Volume Trend (30 days)
          </span>
          <span className="font-mono text-[10px] text-foreground/50">
            {trend[trend.length - 1].value.toLocaleString()} signals
          </span>
        </div>
        <div className="h-28 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(var(--gold))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="rgb(var(--gold))" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 9, fill: "rgb(var(--muted))" }}
                tickLine={false}
                axisLine={{ stroke: "rgb(var(--border))" }}
                interval={2}
              />
              <YAxis hide domain={["dataMin - 20", "dataMax + 20"]} />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--card))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "rgb(var(--muted))" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(var(--gold))"
                strokeWidth={2}
                fill="url(#trendFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="inset-panel p-4">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-gold mb-1.5 uppercase tracking-wide">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Velocity &amp; Shift</span>
          </div>
          <p className="font-body text-sm text-foreground/90 leading-relaxed">{keyShift}</p>
        </div>

        <div className="inset-panel p-4">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-gold mb-1.5 uppercase tracking-wide">
            <Users className="h-3.5 w-3.5" />
            <span>Dominant Narrative</span>
          </div>
          <p className="font-body text-sm text-foreground/90 leading-relaxed">{dominantNarrative}</p>
        </div>
      </div>

      {/* Regional map / heat map */}
      <div className="inset-panel p-4 mt-4">
        <div className="flex items-center justify-between text-xs font-mono text-foreground/60 mb-2.5">
          <span className="flex items-center gap-1.5 font-heading text-gold font-medium">
            <Map className="h-3.5 w-3.5" /> Regional Heat Map:
          </span>
          <span className="flex items-center gap-2">
            {(["positive", "neutral", "negative"] as const).map((s) => (
              <span key={s} className="flex items-center gap-1 text-[9px]">
                <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: statusColor(s) }} />
                {s}
              </span>
            ))}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {regionalSentiment.map((r) => (
            <div
              key={r.zone}
              className="rounded-md border border-border px-1 py-2 text-center"
              style={{
                background: `color-mix(in srgb, ${statusColor(r.status)} 38%, rgb(var(--card)))`,
              }}
              title={`${r.zone}: ${r.score}/100 — ${r.narrative}`}
            >
              <div className="font-mono text-[9px] text-foreground/60">{zoneShort[r.zone] ?? r.zone}</div>
              <div className="font-heading font-bold text-sm text-foreground">{r.score}</div>
            </div>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1">
          {regionalSentiment.map((r) => (
            <p key={r.zone} className="font-body text-[11px] text-foreground/65 leading-snug">
              <span className="font-mono text-[10px] text-gold">{zoneShort[r.zone] ?? r.zone}:</span>{" "}
              {r.narrative}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-mono text-foreground/60 mb-2.5">
          <span className="flex items-center gap-1.5 font-heading text-gold font-medium">
            <Compass className="h-3.5 w-3.5" /> Geographies:
          </span>
          <span className="text-foreground/80">{topGeographies.join(" • ")}</span>
        </div>
        <div className="mt-3 border-t border-border pt-3">
          <span className="text-xs font-heading font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Prescribed Strategic Action:
          </span>
          <p className="font-body text-sm text-foreground mt-1.5 leading-relaxed">{recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}