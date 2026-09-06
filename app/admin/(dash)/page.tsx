import Link from "next/link";
import { getOverviewCounts } from "@/lib/admin-data";
import {
  Users,
  FileText,
  Radio,
  Zap,
  BarChart3,
  PlusCircle,
  Send,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowUpRight,
  Globe,
} from "lucide-react";

export default async function AdminOverviewPage() {
  const counts = await getOverviewCounts();

  const metrics = [
    {
      label: "Subscribers",
      value: counts.subscribers,
      sub: `${counts.activeSubscribers} active retainers`,
      icon: Users,
      href: "/admin/subscribers",
      accent: "text-gold",
    },
    {
      label: "Brief Inquiries",
      value: counts.briefRequests,
      sub: `${counts.newBriefRequests} new leads`,
      icon: FileText,
      href: "/admin/briefs",
      accent: "text-blue-400",
    },
    {
      label: "Signals Radar",
      value: counts.signals,
      sub: `${counts.publishedSignals} live on feed`,
      icon: Radio,
      href: "/admin/signals",
      accent: "text-emerald-400",
    },
    {
      label: "Fozill Pulses",
      value: counts.pulses,
      sub: "weekly issues drafted/broadcast",
      icon: Zap,
      href: "/admin/pulses",
      accent: "text-amber-400",
    },
    {
      label: "Platform Visits",
      value: counts.visits.toLocaleString(),
      sub: "verified page requests",
      icon: BarChart3,
      href: "/admin/analytics",
      accent: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Station Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#121518] via-[#161a1e] to-[#121518] border border-[#23272e]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gold uppercase tracking-widest">
              Executive Console
            </span>
            <span className="w-1 h-1 rounded-full bg-gold"></span>
            <span className="font-mono text-xs text-emerald-400">All Systems Operational</span>
          </div>
          <h2 className="font-heading font-bold text-2xl tracking-tight text-foreground">
            Strategic Operations Command
          </h2>
          <p className="font-body text-xs text-foreground/60 max-w-xl">
            Real-time control over intelligence signals, weekly pulse broadcasts, high-ticket client brief requests, and audience retention.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Link
            href="/admin/signals"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold text-background font-heading font-bold text-xs hover:bg-gold-hover transition-all shadow-md"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Signal</span>
          </Link>
          <Link
            href="/admin/pulses"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181c20] border border-gold/40 text-gold font-mono text-xs hover:bg-gold/10 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Broadcast Issue</span>
          </Link>
          <a
            href="/signals"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#23272e] bg-[#101316] text-xs font-mono text-foreground/70 hover:text-foreground transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Feed</span>
            <ArrowUpRight className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </div>

      {/* 5-Column High Density Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.label}
              href={m.href}
              className="group rounded-2xl border border-border/70 bg-surface/60 p-5 hover:border-gold/50 hover:bg-surface/80 transition-all shadow-sm hover:shadow-[0_0_20px_rgba(216,168,62,0.08)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-foreground/50 uppercase tracking-widest">
                  {m.label}
                </span>
                <div className={`p-2 rounded-lg bg-background/80 border border-border/40 ${m.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-3xl tracking-tight text-foreground group-hover:text-gold transition-colors">
                  {m.value}
                </div>
                <div className="font-mono text-[11px] text-foreground/50 mt-1 truncate">
                  {m.sub}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Operational Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Intelligence Publishing Engine */}
        <div className="rounded-2xl border border-border bg-surface/60 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-gold" />
              <h3 className="font-heading font-bold text-base text-foreground">
                Intelligence Pipeline Status
              </h3>
            </div>
            <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
              Pillar 1 & 2 Active
            </span>
          </div>

          <p className="font-body text-xs text-foreground/70 leading-relaxed">
            Manage your sovereign and corporate intelligence flow. Published signals immediately synchronize with the public homepage ticker and `/signals` feed.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href="/admin/signals"
              className="p-3 rounded-xl border border-border/80 bg-background/50 hover:border-gold/40 hover:bg-surface transition-all flex flex-col gap-1"
            >
              <span className="font-heading font-semibold text-xs text-foreground flex items-center justify-between">
                <span>Signals Radar</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </span>
              <span className="font-mono text-[11px] text-foreground/50">
                {counts.publishedSignals} live signals active
              </span>
            </Link>

            <Link
              href="/admin/pulses"
              className="p-3 rounded-xl border border-border/80 bg-background/50 hover:border-gold/40 hover:bg-surface transition-all flex flex-col gap-1"
            >
              <span className="font-heading font-semibold text-xs text-foreground flex items-center justify-between">
                <span>Pulse Dispatch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </span>
              <span className="font-mono text-[11px] text-foreground/50">
                Weekly issues & broadcasting
              </span>
            </Link>
          </div>
        </div>

        {/* Card 2: Security & Infrastructure Guard */}
        <div className="rounded-2xl border border-border bg-surface/60 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="font-heading font-bold text-base text-foreground">
                Security & Compliance Architecture
              </h3>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">
              Enforced
            </span>
          </div>

          <ul className="space-y-2.5 text-xs font-mono">
            <li className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-foreground/80">Row Level Security (RLS)</span>
              </div>
              <span className="text-emerald-400 text-[11px]">Strict Policies</span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/40">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-foreground/80">Supabase DB & Service Role</span>
              </div>
              <span className="text-emerald-400 text-[11px]">Connected</span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/40">
              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-gold" />
                <span className="text-foreground/80">Resend Outbound Dispatcher</span>
              </div>
              <span className="text-gold text-[11px]">Batch API Ready</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
