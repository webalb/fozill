"use client";

import React, { useState } from "react";
import { Network, Database, Brain, Sparkles, MapPin, MessageSquare, AlertTriangle } from "lucide-react";

export function IntelligenceGraphMock() {
  const [activeNode, setActiveNode] = useState<string>("narrative");

  const nodeDetails: Record<string, { title: string; subtitle: string; metrics: string[]; quote: string }> = {
    entity: {
      title: "Entity Cluster (FMCG Tier-1 / Brands)",
      subtitle: "Ingesting corporate communications, pricing lists & distributor feedback",
      metrics: ["14 Brands Monitored", "92.4% Entity Resolution Accuracy", "Real-time Product Linking"],
      quote: "Identifies brands, products, subsidiaries, and key C-suite figures across fragmented data streams.",
    },
    narrative: {
      title: "Narrative Arc: 'Shrinkflation & Pack Downsizing'",
      subtitle: "Tracking velocity across English, Nigerian Pidgin, and Hausa digital channels",
      metrics: ["Growth Velocity: +31% WoW", "Sentiment: 73% Negative", "Amplification Factor: 4.8x"],
      quote: "Detects why complaints are rising and clusters organic themes before mainstream press coverage.",
    },
    influencer: {
      title: "Influence & Amplification Nodes",
      subtitle: "Distinguishing genuine community drivers from paid bot astroturfing",
      metrics: ["5 Key Driver Accounts", "42% Total Reach Concentration", "Bot Network Filter: Active"],
      quote: "Maps who started the conversation, who amplified it, and which communities are genuinely reacting.",
    },
    geo: {
      title: "Geopolitical Sentiment Divergence",
      subtitle: "Regional comparative analysis across Nigeria's 6 geopolitical zones",
      metrics: ["North-West: 28% Pos (High Price Sensitivity)", "South-West: 52% Pos (Feature Focus)", "6 Zones Indexed"],
      quote: "Breaks down how a brand or policy is perceived across Kano, Abuja, Lagos, Onitsha, and Port Harcourt.",
    },
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#2C3138] bg-[#14171A] p-6 lg:p-8 shadow-2xl overflow-hidden">
      {/* Background visual grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#2C3138_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2C3138] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#D8A83E]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D8A83E]">
              FOZILL INTELLIGENCE GRAPH ENGINE
            </span>
          </div>
          <p className="font-body text-xs text-[#F5F5F2]/60 mt-1">
            Real-time multi-dimensional synthesis: Entities → Narratives → Drivers → Geographies
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-mono text-[11px] text-[#F5F5F2]/70">GRAPH LIVE • 1.2M SIGNALS/DAY</span>
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
                  ? "bg-[#202428] border-[#D8A83E] shadow-lg shadow-[#D8A83E]/10"
                  : "bg-[#181B1E] border-[#2C3138] hover:border-[#D8A83E]/50 hover:bg-[#1C2024]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D8A83E]" : "text-[#F5F5F2]/50"}`} />
                {isActive && <Sparkles className="w-3.5 h-3.5 text-[#D8A83E] animate-pulse" />}
              </div>
              <span
                className={`font-heading text-xs font-semibold block ${
                  isActive ? "text-[#D8A83E]" : "text-[#F5F5F2]"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="relative z-10 rounded-xl border border-[#2C3138] bg-[#181B1E]/95 p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-[#2C3138]">
          <h4 className="font-heading font-bold text-sm text-[#F5F5F2] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D8A83E]" />
            {nodeDetails[activeNode].title}
          </h4>
          <span className="font-mono text-[11px] text-[#D8A83E]/90 bg-[#D8A83E]/10 px-2 py-0.5 rounded border border-[#D8A83E]/30">
            {nodeDetails[activeNode].subtitle}
          </span>
        </div>

        <p className="font-body text-sm text-[#F5F5F2]/80 mt-3 leading-relaxed">
          {nodeDetails[activeNode].quote}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#2C3138]">
          {nodeDetails[activeNode].metrics.map((m, idx) => (
            <div key={idx} className="bg-[#202428] px-3 py-2 rounded-lg border border-[#2C3138]">
              <span className="font-mono text-xs text-[#D8A83E] font-medium block">
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
