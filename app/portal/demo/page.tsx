"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { SAMPLE_DOSSIERS } from "@/lib/data/sample-dossiers";

function statusColor(status: "positive" | "neutral" | "negative") {
  return status === "positive"
    ? "rgb(var(--positive))"
    : status === "negative"
    ? "rgb(var(--negative))"
    : "rgb(var(--gold))";
}

/* Stylized Nigeria heat-map (schematic 6-zone grid) */
function ZoneMap({ dossier }: { dossier: (typeof SAMPLE_DOSSIERS)[keyof typeof SAMPLE_DOSSIERS] }) {
  // Layout: [NW, NE] / [NC, SE] / [SW, SS] — approximates Nigeria's geography
  const rows: string[][] = [
    ["North-West", "North-East"],
    ["North-Central", "South-East"],
    ["South-West", "South-South"],
  ];
  const zoneShort: Record<string, string> = {
    "North-West": "NW",
    "North-East": "NE",
    "North-Central": "NC",
    "South-West": "SW",
    "South-East": "SE",
    "South-South": "SS",
  };
  return (
    <div className="space-y-1.5">
      {rows.map((row, ri) => (
        <div key={ri} className="grid grid-cols-2 gap-1.5">
          {row.map((zone) => {
            const r = dossier.regionalSentiment.find((x) => x.zone === zone);
            if (!r) return <div key={zone} className="rounded-md border border-border bg-elevated/60 p-3" />;
            return (
              <div
                key={zone}
                className="rounded-lg border border-border p-3 text-center"
                style={{
                  background: `color-mix(in srgb, ${statusColor(r.status)} 38%, rgb(var(--card)))`,
                }}
                title={`${r.zone}: ${r.score}/100 — ${r.narrative}`}
              >
                <div className="font-mono text-[10px] text-foreground/60">{zoneShort[zone]}</div>
                <div className="font-heading font-bold text-xl text-foreground leading-tight">{r.score}</div>
                <div className="font-body text-[10px] text-foreground/55 mt-0.5 leading-snug">{zone}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* Trend area chart with dashed forecast (fmcg) */
function TrendChart({ dossier }: { dossier: (typeof SAMPLE_DOSSIERS)[keyof typeof SAMPLE_DOSSIERS] }) {
  const historical = dossier.trend.map((d) => ({ ...d, forecast: null }));
  const projected = dossier.forecast.map((d) => ({ ...d, value: null, forecast: d.value }));
  const data = [
    ...historical,
    { ...projected[0], value: undefined, forecast: undefined, join: true },
    ...projected,
  ];
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 6, right: 6, left: 6, bottom: 0 }}>
          <defs>
            <linearGradient id="termTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--gold))" stopOpacity={0.35} />
              <stop offset="100%" stopColor="rgb(var(--gold))" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 9, fill: "rgb(var(--muted))" }}
            tickLine={false}
            axisLine={{ stroke: "rgb(var(--border))" }}
            interval={1}
          />
          <YAxis
            width={34}
            tick={{ fontSize: 9, fill: "rgb(var(--muted))" }}
            tickLine={false}
            axisLine={{ stroke: "rgb(var(--border))" }}
          />
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
            name="Signal Volume"
            stroke="rgb(var(--gold))"
            strokeWidth={2}
            fill="url(#termTrendFill)"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            name="Forecast"
            stroke="rgb(var(--gold))"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/* Comparative bar graph (political) */
function ZoneBarGraph({ dossier }: { dossier: (typeof SAMPLE_DOSSIERS)[keyof typeof SAMPLE_DOSSIERS] }) {
  const zoneShort: Record<string, string> = {
    "North-West": "NW",
    "North-East": "NE",
    "North-Central": "NC",
    "South-West": "SW",
    "South-East": "SE",
    "South-South": "SS",
  };
  const data = dossier.regionalSentiment.map((r) => ({
    label: zoneShort[r.zone] ?? r.zone,
    score: r.score,
    status: r.status,
  }));
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 6, right: 6, left: 6, bottom: 0 }}>
          <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "rgb(var(--muted))" }}
            tickLine={false}
            axisLine={{ stroke: "rgb(var(--border))" }}
          />
          <YAxis
            width={30}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: "rgb(var(--muted))" }}
            tickLine={false}
            axisLine={{ stroke: "rgb(var(--border))" }}
          />
          <Tooltip
            cursor={{ fill: "rgb(var(--card))" }}
            contentStyle={{
              background: "rgb(var(--card))",
              border: "1px solid rgb(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "rgb(var(--muted))" }}
          />
          <Bar dataKey="score" name="Sentiment Score" radius={[4, 4, 0, 0]} maxBarSize={38}>
            {data.map((d, i) => (
              <Cell key={i} fill={statusColor(d.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
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
        subtitle="A read-only preview of the continuous intelligence workspace offered to enterprise retainers. Switch the dossier to see distinct visualizations — map, chart, and graph — with predictive outlook."
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

          {/* Right: visualization + outlook */}
          <div className="rounded-2xl border border-border bg-surface/80 p-8">
            <div className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-6">
              {activeDossier === "fintech"
                ? "Geopolitical Sentiment Map"
                : activeDossier === "fmcg"
                ? "Signal Volume Trend"
                : "Zone Sentiment Comparison"}
            </div>

            {/* Distinct visualization per dossier */}
            <div className="mb-6">
              {activeDossier === "fintech" ? (
                <ZoneMap dossier={dossier} />
              ) : activeDossier === "fmcg" ? (
                <TrendChart dossier={dossier} />
              ) : (
                <ZoneBarGraph dossier={dossier} />
              )}
            </div>

            {/* Predictive Outlook */}
            <div className="rounded-xl border border-gold/30 bg-elevated/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-gold uppercase tracking-wider">
                  Predictive Outlook
                </span>
                <span className="font-mono text-[10px] text-foreground/60">
                  {dossier.confidence}% confidence
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-card overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${dossier.confidence}%` }}
                />
              </div>
              <p className="font-body text-xs text-foreground/80 leading-relaxed">
                {dossier.outlook}
              </p>
            </div>

            <div className="mt-6 inset-panel p-4">
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
