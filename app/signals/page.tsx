import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { SignalFeed } from "@/components/signals/signal-feed";
import { getPublishedSignals } from "@/lib/public-signals";
import { ArrowRight, ShieldCheck, Activity } from "lucide-react";

export const metadata = {
  title: "Live Signals Radar · Fozill Strategic Intelligence",
  description:
    "Real-time macro, sector, and political intelligence signals synthesized from Nigeria's public information environment.",
};

export const revalidate = 120;

export default async function SignalsPage() {
  const signals = await getPublishedSignals({ limit: 40 });

  return (
    <>
      <PageHeader
        eyebrow="Public Signal Stream"
        title="Live Intelligence Radar"
        subtitle="High-frequency macro, sector, and political signals detected across Nigeria and key emerging corridors. Updated continuously as conversations, policy shifts, and price resistance events unfold."
        cta={{
          label: "Commission a Dedicated Brief",
          href: "/contact",
        }}
      />

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignalFeed initialSignals={signals} />

        {/* Bottom Conversion Banner */}
        <div className="mt-20 rounded-3xl border border-gold/30 bg-gradient-to-br from-surface to-elevated p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 font-mono text-[10px] text-gold uppercase tracking-wider">
              <Activity className="w-3 h-3 text-positive" />
              Continuous Surveillance Architecture
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight">
              Turn Public Friction Into Strategic Advantage Before Your Competitors Notice
            </h2>
            <p className="font-body text-sm text-foreground/75 leading-relaxed">
              Don&apos;t wait for customer complaints to turn into revenue attrition or PR crises. Our analysts deliver private Monday morning executive dossiers, localized sentiment heatmaps, and counter-narrative playbooks directly to your leadership desk.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all shadow-lg shadow-gold/20"
              >
                <span>Request Retainer Scoping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/briefs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-surface text-foreground font-heading font-medium text-sm hover:border-gold/50 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Review Sample Dossiers</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
