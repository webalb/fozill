"use client";

import { TrendingUp, Map } from "lucide-react";
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
    <div className="relative rounded-xl border border-border bg-surface/90 p-5 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-gold uppercase">
          {classification}
        </span>
        <span className="font-mono text-[11px] text-foreground/50">TARGET: {targetEntity}</span>
      </div>

      {/* Health + Trend row */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-7 gap-4">
        <div className="sm:col-span-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50">
              Health Score
            </span>
            <span className="font-mono text-[10px] text-foreground/70">
              {healthScore.positive}P / {healthScore.neutral}N / {healthScore.negative}G
            </span>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-elevated border border-border">
            <div style={{ width: `${healthScore.positive}%` }} className="bg-positive" />
            <div style={{ width: `${healthScore.neutral}%` }} className="bg-neutral" />
            <div style={{ width: `${healthScore.negative}%` }} className="bg-negative" />
          </div>
        </div>

        <div className="sm:col-span-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-gold" /> 30-Day Trend
            </span>
            <span className="font-mono text-[10px] text-foreground/70">
              {trend[trend.length - 1].value.toLocaleString()} signals
            </span>
          </div>
          <div className="h-14 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--gold))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="rgb(var(--gold))" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 8, fill: "rgb(var(--muted))" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgb(var(--border))" }}
                  interval={3}
                />
                <YAxis hide domain={["dataMin - 20", "dataMax + 20"]} />
                <Tooltip
                  contentStyle={{
                    background: "rgb(var(--card))",
                    border: "1px solid rgb(var(--border))",
                    borderRadius: 8,
                    fontSize: 11,
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
      </div>

      {/* Key insight */}
      <p className="mt-4 text-sm text-foreground/90 leading-snug border-l-2 border-gold pl-3">
        <span className="font-heading font-semibold text-gold text-xs uppercase tracking-wide mr-2">
          Shift:
        </span>
        {keyShift}
      </p>

      {/* Heatmap */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50 flex items-center gap-1">
            <Map className="h-3 w-3 text-gold" /> Regional Sentiment
          </span>
          <span className="font-mono text-[10px] text-foreground/50">
            {topGeographies.join(" • ")}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {regionalSentiment.map((r) => (
            <div
              key={r.zone}
              className="rounded-md border border-border px-1 py-1.5 text-center"
              style={{ background: `color-mix(in srgb, ${statusColor(r.status)} 32%, rgb(var(--card)))` }}
              title={`${r.zone}: ${r.score}/100 — ${r.narrative}`}
            >
              <div className="font-mono text-[9px] text-foreground/60">{zoneShort[r.zone] ?? r.zone}</div>
              <div className="font-heading font-bold text-sm text-foreground leading-tight">{r.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended action */}
      <div className="mt-4 flex items-start gap-2 border-t border-border pt-3">
        <span className="text-[10px] font-heading font-bold text-gold uppercase tracking-wider pt-0.5 shrink-0">
          Action:
        </span>
        <p className="text-[13px] text-foreground/85 leading-snug">{recommendedAction}</p>
      </div>

      {/* Narrative */}
      <p className="mt-3 text-[13px] text-foreground/70 italic leading-snug">
        “{dominantNarrative}”
      </p>
    </div>
  );
}