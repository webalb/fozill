import Link from "next/link";
import { getOverviewCounts } from "@/lib/admin-data";

export default async function AdminOverviewPage() {
  const counts = await getOverviewCounts();

  const cards = [
    { label: "Subscribers", value: counts.subscribers, sub: `${counts.activeSubscribers} active`, href: "/admin/subscribers" },
    { label: "Brief Requests", value: counts.briefRequests, sub: `${counts.newBriefRequests} new`, href: "/admin/briefs" },
    { label: "Signals", value: counts.signals, sub: `${counts.publishedSignals} published`, href: "/admin/signals" },
    { label: "Pulses", value: counts.pulses, sub: "issues drafted/published", href: "/admin/pulses" },
    { label: "Page Visits", value: counts.visits, sub: "tracked all-time", href: "/admin/analytics" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="rounded-2xl border border-border bg-surface/70 p-6 transition-colors hover:border-gold"
        >
          <div className="font-mono text-xs text-foreground/50 uppercase tracking-widest">{c.label}</div>
          <div className="font-heading font-bold text-4xl tracking-tight mt-2">{c.value}</div>
          <div className="font-body text-sm text-foreground/60 mt-1">{c.sub}</div>
        </Link>
      ))}

      <div className="rounded-2xl border border-border bg-surface/70 p-6">
        <div className="font-mono text-xs text-foreground/50 uppercase tracking-widest">Publishing</div>
        <p className="font-body text-sm text-foreground/70 mt-3">
          Draft, edit and publish Intelligence Signals and Pulse issues from the{" "}
          <Link href="/admin/signals" className="text-gold hover:underline">Signals</Link> and{" "}
          <Link href="/admin/pulses" className="text-gold hover:underline">Pulses</Link> tabs.
        </p>
      </div>
    </div>
  );
}
