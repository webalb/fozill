"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ShieldAlert,
  MapPin,
  Lock,
  Clock,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { IntelligenceSignal } from "@/lib/types";

interface SignalFeedProps {
  initialSignals: IntelligenceSignal[];
}

const CATEGORIES = [
  { id: "all", label: "All Signals" },
  { id: "business", label: "Business & Brand" },
  { id: "political", label: "Political Identity" },
  { id: "economic", label: "Economic & Macro" },
  { id: "sector", label: "Sector Dynamics" },
  { id: "crisis", label: "Crisis Warnings" },
];

export function SignalFeed({ initialSignals }: SignalFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSignals = useMemo(() => {
    return initialSignals.filter((signal) => {
      const matchesCategory =
        selectedCategory === "all" || signal.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        signal.title.toLowerCase().includes(q) ||
        signal.body.toLowerCase().includes(q) ||
        (signal.location && signal.location.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialSignals, selectedCategory, searchQuery]);

  const categoryColor = (cat: string) => {
    switch (cat) {
      case "crisis":
        return "bg-negative/15 text-negative border-negative/30";
      case "political":
        return "bg-gold/15 text-gold border-gold/30";
      case "economic":
        return "bg-foreground/10 text-foreground/80 border-border";
      case "sector":
        return "bg-positive/15 text-positive border-positive/30";
      default:
        return "bg-elevated text-gold border-border";
    }
  };

  const formatDate = (isoStr?: string | null) => {
    if (!isoStr) return "Recent";
    const date = new Date(isoStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg font-heading text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-gold text-background shadow-md shadow-gold/20"
                  : "bg-surface border border-border text-foreground/70 hover:text-foreground hover:border-gold/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals by topic or region…"
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground/40 font-body text-xs focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Signal Count Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-foreground/50 border-b border-border pb-3">
        <span>
          Displaying {filteredSignals.length} active signal{filteredSignals.length === 1 ? "" : "s"}
        </span>
        <span className="flex items-center gap-1.5 text-gold">
          <Sparkles className="w-3.5 h-3.5" /> Synchronized with live database
        </span>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSignals.map((signal) => {
          const direction = signal.direction || "neutral";
          return (
            <div
              key={signal.id}
              id={signal.id}
              className="card-panel bg-surface/80 p-6 flex flex-col justify-between hover:border-gold/50 transition-all group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase border tracking-wider ${categoryColor(
                        signal.category
                      )}`}
                    >
                      {signal.category}
                    </span>
                    {signal.location && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-foreground/50">
                        <MapPin className="w-3 h-3 text-gold/70" />
                        {signal.location}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-foreground/40">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(signal.published_at || signal.created_at)}
                    </span>
                    {signal.confidence && (
                      <span className="px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/60 border border-border">
                        {signal.confidence}% Conf.
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-gold transition-colors leading-snug mb-3">
                  {signal.title}
                </h3>

                {/* Body Summary */}
                <p className="font-body text-sm text-foreground/75 leading-relaxed mb-6">
                  {signal.body}
                </p>
              </div>

              {/* Gated Strategic Response Box */}
              <div className="rounded-xl border border-border/70 bg-elevated/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-gold" />
                    <span className="font-mono text-[11px] font-bold text-foreground/80 uppercase tracking-wide">
                      Strategic Playbook &amp; Attribution
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-gold uppercase bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                    Retainer Only
                  </span>
                </div>
                <p className="font-body text-xs text-foreground/60 leading-relaxed">
                  Detailed narrative attribution, influencer cluster breakdown, and sub-national divergence playbooks are delivered to active corporate and political retainers.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-foreground/50">
                    Velocity Direction:{" "}
                    {direction === "up" ? (
                      <span className="text-positive font-bold flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5" /> Rising Risk
                      </span>
                    ) : direction === "down" ? (
                      <span className="text-negative font-bold flex items-center">
                        <ArrowDownRight className="w-3.5 h-3.5" /> Cooling Signal
                      </span>
                    ) : (
                      <span className="text-neutral font-bold flex items-center">
                        <Minus className="w-3.5 h-3.5" /> Stable Baseline
                      </span>
                    )}
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-gold hover:text-gold-hover transition-colors"
                  >
                    <span>Request Full Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {filteredSignals.length === 0 && (
          <div className="col-span-full text-center py-16 card-panel bg-surface/40">
            <SlidersHorizontal className="w-8 h-8 text-foreground/30 mx-auto mb-3" />
            <h4 className="font-heading font-bold text-base text-foreground">
              No matching signals found
            </h4>
            <p className="font-body text-xs text-foreground/50 mt-1 max-w-sm mx-auto">
              No active intelligence signals match your current query or category filter. Try clearing filters or submit a bespoke briefing inquiry.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-gold/10 text-gold border border-gold/30 font-heading text-xs font-bold hover:bg-gold/20 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
