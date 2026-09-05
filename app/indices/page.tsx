import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getDynamicPulses, getLatestMarketMood } from "@/lib/public-indices";
import { ArrowRight, TrendingUp, TrendingDown, Minus, Activity, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Indices & Market Mood · Fozill Strategic Intelligence",
  description:
    "Live synthetic benchmarks tracking consumer price sensitivity, fintech reliability, and regional policy reception across Nigeria.",
};

export const revalidate = 180;

export default async function IndicesPage() {
  const [pulses, marketMood] = await Promise.all([
    getDynamicPulses(),
    getLatestMarketMood(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Public Intelligence Benchmarks"
        title="Global Indices & Market Mood"
        subtitle="Free, recurring synthetic benchmarks tracking household price sensitivity, currency pass-through, and digital banking friction. A glimpse into the predictive rigor we deploy for private retainers."
      />

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Market Mood Live Benchmark Bar */}
        <div className="rounded-2xl border border-gold/40 bg-surface/90 p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl shadow-gold/5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-gold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-positive animate-ping" />
              Live Nigeria Sentiment Pulse
            </div>
            <h2 className="font-heading font-bold text-2xl text-foreground">
              Market Mood Index:{" "}
              <span className="text-gold font-mono">{marketMood.mood} / 100</span>
            </h2>
            <p className="font-body text-sm text-foreground/70 max-w-xl">
              Composite public sentiment evaluating household price resistance, brand loyalty resilience, and grassroots economic pressure across all 6 geopolitical zones.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <div className="rounded-xl border border-border bg-elevated px-5 py-3 text-center">
              <div className="font-mono text-[10px] text-foreground/50 uppercase">Current Climate</div>
              <div className="font-heading font-bold text-sm text-gold mt-0.5">
                {marketMood.label}
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gold text-background font-heading font-bold text-xs hover:bg-gold-hover transition-all"
            >
              <span>Subscribe to Weekly Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dynamic Pulses / Indices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pulses.map((pulse, idx) => {
            const mood = pulse.mood_index ?? 50;
            const direction = mood > 60 ? "up" : mood < 45 ? "down" : "neutral";
            const DirectionIcon =
              direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;
            const directionColor =
              direction === "up"
                ? "text-positive"
                : direction === "down"
                ? "text-negative"
                : "text-neutral";

            return (
              <div
                key={pulse.id}
                className="rounded-2xl border border-border bg-surface/80 p-7 flex flex-col justify-between hover:border-gold/50 transition-all card-panel"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="gold-chip">
                      Index Issue #{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-foreground/40">
                      {pulse.published_at ? new Date(pulse.published_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "Active"}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg mb-3 leading-snug">
                    {pulse.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-3xl font-bold text-gold">
                      {mood}
                    </span>
                    <span className={`font-mono text-xs font-semibold ${directionColor} flex items-center gap-1`}>
                      <DirectionIcon className="w-3.5 h-3.5" />
                      {direction === "up" ? "Elevated Sentiment" : direction === "down" ? "Cooling Pressure" : "Stable Baseline"}
                    </span>
                  </div>

                  <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6">
                    {pulse.summary}
                  </p>

                  {/* Highlights / Takeaways */}
                  {pulse.pulse_items && pulse.pulse_items.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                        Core Takeaways:
                      </div>
                      {pulse.pulse_items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-start gap-2 font-body text-xs text-foreground/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{item.body}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-foreground/40">
                    {pulse.pulse_items?.length ?? 0} Sub-indicators
                  </span>
                  <Link
                    href="/contact"
                    className="link-gold inline-flex items-center gap-1 text-xs"
                  >
                    <span>Request Full Analysis</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}