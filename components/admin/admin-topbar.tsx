"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink, Globe, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface AdminTopbarProps {
  onOpenMobileSidebar: () => void;
}

const pageTitles: Record<string, { category: string; title: string }> = {
  "/admin": { category: "Operations", title: "Executive Overview" },
  "/admin/signals": { category: "Intelligence Pipeline", title: "Signals Radar" },
  "/admin/pulses": { category: "Market Mood", title: "Fozill Pulse & Issues" },
  "/admin/briefs": { category: "Inbound Pipeline", title: "Executive Brief Requests" },
  "/admin/subscribers": { category: "Audience Distribution", title: "Subscriber Registry" },
  "/admin/analytics": { category: "Telemetry", title: "Platform Traffic & Engagement" },
};

export function AdminTopbar({ onOpenMobileSidebar }: AdminTopbarProps) {
  const pathname = usePathname();
  const current = pageTitles[pathname] || {
    category: "Operations Console",
    title: pathname.replace("/admin/", "").replace("-", " ").toUpperCase(),
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-panel/90 backdrop-blur-md border-b border-panel-border px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-lg border border-panel-border text-foreground/70 hover:text-foreground hover:bg-panel-hover transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
            <span>Fozill Console</span>
            <span>/</span>
            <span className="text-gold/80">{current.category}</span>
          </div>
          <h1 className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight leading-tight">
            {current.title}
          </h1>
        </div>
      </div>

      {/* Right: Operational Controls & Links */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Status indicator */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>POSTGRES RLS ACTIVE</span>
        </div>

        {/* Quick View Public Site */}
        <a
          href="/signals"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-panel-border bg-panel-strong hover:border-gold/40 text-xs font-mono text-foreground/80 hover:text-gold transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-gold" />
          <span>Live Feed</span>
          <ExternalLink className="w-3 h-3 opacity-50" />
        </a>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
