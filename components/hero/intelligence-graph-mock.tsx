"use client";

import React, { useState } from "react";
import { Network, Database, Brain, Sparkles, MapPin, MessageSquare } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const nodeDetails: Record<
  string,
  { title: string; subtitle: string; metrics: string[]; quote: string; trend: { label: string; value: number }[]; geo?: { zone: string; score: number; color: string }[] }
> = {
  entity: {
    title: "Entity Cluster (FMCG Tier-1 / Brands)",
    subtitle: "Ingesting corporate communications, pricing lists & distributor feedback",
    metrics: ["14 Brands Monitored", "92.4% Entity Resolution Accuracy", "Real-time Product Linking"],
    quote: "Identifies brands, products, subsidiaries, and key C-suite figures across fragmented data streams.",
    trend: [
      { label: "W1", value: 44 },
      { label: "W2", value: 58 },
      { label: "W3", value: 71 },
      { label: "W4", value: 84 },
      { label: "W5", value: 98 },
    ],
  },
  narrative: {
    title: "Narrative Arc: 'Shrinkflation & Pack Downsizing'",
    subtitle: "Tracking velocity across global and Nigerian digital channels",
    metrics: ["Growth Velocity: +31% WoW", "Sentiment: 73% Negative", "Amplification Factor: 4.8x"],
    quote: "Detects why complaints are rising and clusters organic themes before mainstream press coverage.",
    trend: [
      { label: "1 Aug", value: 78 },
      { label: "4 Aug", value: 121 },
      { label: "7 Aug", value: 176 },
      { label: "10 Aug", value: 214 },
      { label: "13 Aug", value: 258 },
      { label: "16 Aug", value: 298 },
      { label: "19 Aug", value: 334 },
    ],
  },
  influencer: {
    title: "Influence & Amplification Nodes",
    subtitle: "Distinguishing genuine community drivers from paid bot astroturfing",
    metrics: ["5 Key Driver Accounts", "42% Total Reach Concentration", "Bot Network Filter: Active"],
    quote: "Maps who started the conversation, who amplified it, and which communities are genuinely reacting.",
    trend: [
      { label: "N1", value: 12 },
      { label: "N2", value: 30 },
      { label: "N3", value: 55 },
      { label: "N4", value: 42 },
      { label: "N5", value: 68 },
    ],
  },
  geo: {
    title: "Geopolitical Sentiment Divergence",
    subtitle: "Regional comparative analysis across Nigeria's 6 geopolitical zones",
    metrics: ["North-West: 28% Pos (High Price Sensitivity)", "South-West: 52% Pos (Feature Focus)", "6 Zones Indexed"],
    quote: "Breaks down how a brand or policy is perceived across Kano, Abuja, Lagos, Onitsha, and Port Harcourt.",
    trend: [
      { label: "W1", value: 38 },
      { label: "W2", value: 45 },
      { label: "W3", value: 52 },
      { label: "W4", value: 48 },
      { label: "W5", value: 61 },
    ],
    geo: [
      { zone: "NW", score: 28, color: "rgb(var(--negative))" },
      { zone: "NE", score: 32, color: "rgb(var(--negative))" },
      { zone: "NC", score: 54, color: "rgb(var(--gold))" },
      { zone: "SW", score: 58, color: "rgb(var(--positive))" },
      { zone: "SE", score: 38, color: "rgb(var(--negative))" },
      { zone: "SS", score: 46, color: "rgb(var(--gold))" },
    ],
  },
};

export function IntelligenceGraphMock() {
  const [activeNode, setActiveNode] = useState<string>("narrative");
  const current = nodeDetails[activeNode];

  return (
    <div className="relative w-full rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-2xl overflow-hidden">
      {/* Background visual grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(rgb(var(--border))_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-gold" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
              FOZILL INTELLIGENCE GRAPH ENGINE
            </span>
          </div>
          <p className="font-body text-xs text-foreground/60 mt-1">
            Real-time multi-dimensional synthesis: Entities → Narratives → Drivers → Geographies
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-positive animate-pulse" />
          <span className="font-mono text-[11px] text-foreground/70">GRAPH LIVE • 1.2M SIGNALS/DAY</span>
        </div>
      </div>

      {/* Interactive Graph Node Selector */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          { id: "entity", name: "1. Entities & Brands", icon: Database },
          { id: "narrative", name: "2. Emerging Narratives", icon: MessageSquare },
          { id: "influencer", name: "3. Amplification Nodes", icon: Brain },
          { id: "geo", name: "4. Geopolitical Zones", icon: MapPin },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeNode === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNode(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? "bg-elevated border-gold shadow-lg shadow-gold/10"
                  : "bg-surface border-border hover:border-gold/50 hover:bg-elevated"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-foreground/50"}`} />
                {isActive && <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />}
              </div>
              <span
                className={`font-heading text-xs font-semibold block ${
                  isActive ? "text-gold" : "text-foreground"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="relative z-10 rounded-xl border border-border bg-surface/95 p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-border">
          <h4 className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            {current.title}
          </h4>
          <span className="font-mono text-[11px] text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
            {current.subtitle}
          </span>
        </div>

        <p className="font-body text-sm text-foreground/80 mt-3 leading-relaxed">
          {current.quote}
        </p>

        {/* Chart */}
        <div className="mt-4 rounded-lg border border-border bg-elevated/60 p-3">
          {activeNode === "geo" && current.geo ? (
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={current.geo} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                  <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="zone"
                    tick={{ fontSize: 10, fill: "rgb(var(--muted))" }}
                    tickLine={false}
                    axisLine={{ stroke: "rgb(var(--border))" }}
                  />
                  <YAxis hide domain={[0, 100]} />
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
                  <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={32}>
                    {current.geo.map((g) => (
                      <Cell key={g.zone} fill={g.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={current.trend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
                  <defs>
                    <linearGradient id="graphTrendFill" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#graphTrendFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-border">
          {current.metrics.map((m, idx) => (
            <div key={idx} className="bg-elevated px-3 py-2 rounded-lg border border-border">
              <span className="font-mono text-xs text-gold font-medium block">
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}