import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Lock, ChevronRight } from "lucide-react";
import { SignalTicker } from "@/components/hero/signal-ticker";
import { IntelligenceGraphMock } from "@/components/hero/intelligence-graph-mock";
import { DossierCard } from "@/components/intelligence/dossier-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PRICING_TIERS } from "@/lib/data/pricing-tiers";
import { SAMPLE_DOSSIERS } from "@/lib/data/sample-dossiers";
import { NIGERIA_GEOPOLITICAL_ZONES } from "@/lib/data/geopolitical-zones";

const pillars = [
  {
    id: "business",
    title: "Business & Marketing Intelligence",
    tag: "Cash Engine",
    description:
      "Brand health tracking, competitor early warning, and sentiment shift detection across Nigeria's commercial corridors. Know when a rival gains organic traction before it shows up in quarterly sales.",
    points: [
      "Competitor momentum radar",
      "Brand crisis early warning",
      "Influencer ROI & network impact",
    ],
    href: "/solutions/business-marketing",
  },
  {
    id: "political",
    title: "Political & Public Identity Intelligence",
    tag: "2027 Window",
    description:
      "Perception mapping and multi-lingual narrative attribution across all 36 states and 6 geopolitical zones. We tell you who started a conversation, who amplified it, and why regions diverge.",
    points: [
      "Kano vs Kaduna vs Lagos comparison",
      "Narrative attribution & bot filtering",
      "Counter-narrative testing",
    ],
    href: "/solutions/political-identity",
  },
  {
    id: "economic",
    title: "Economic & Sector Intelligence",
    tag: "Most Sophisticated",
    description:
      "Macro sentiment on FX, subsidy reform, inflation, and purchasing power. Sector deep dives and price-sensitivity tracking for investors and corporate strategy teams.",
    points: [
      "Nigeria Consumer Pressure Index",
      "Sector deep dives",
      "Policy impact analysis",
    ],
    href: "/solutions/economic-intelligence",
  },
];

export default function Home() {
  const retainer = PRICING_TIERS.find((t) => t.id === "retainer-starter") ?? PRICING_TIERS[0];
  const fmcgDossier = SAMPLE_DOSSIERS["fmcg"];
  const zones = NIGERIA_GEOPOLITICAL_ZONES;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--gold)_/_0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 font-mono text-[11px] text-gold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                Nigeria Strategic Intelligence Desk
              </div>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-[1.05] tracking-tight">
                Turn Nigeria&apos;s Public Signals Into{" "}
                <span className="gold-gradient-text">Strategic Decisions.</span>
              </h1>
              <p className="font-body text-lg text-foreground/80 leading-relaxed max-w-xl">
                We monitor public discourse, digital media, regional sentiment, and institutional
                data across Nigeria to tell CEOs, CMOs, and political leaders what is happening,
                why, and what to do next.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all shadow-lg shadow-gold/20"
                >
                  <span>Request an Intelligence Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/briefs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-surface/60 text-foreground font-heading font-medium text-sm hover:border-gold/50 hover:bg-elevated transition-all"
                >
                  <Lock className="w-4 h-4 text-gold" />
                  <span>View Sample Intelligence Dossier</span>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-2 text-xs font-mono text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-positive" /> 1.2M signals / day
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" /> OSINT &amp; NDPR compliant
                </span>
              </div>
            </div>
            <IntelligenceGraphMock />
          </div>
        </div>
      </section>

      <SignalTicker />

      {/* PILLARS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="font-mono text-xs text-gold uppercase tracking-widest mb-3">
            One Engine. Three Strategic Pillars.
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">
            Intelligence for Decision-Makers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group flex flex-col card-panel bg-surface/80 p-7 hover:border-gold/50 hover:bg-elevated transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="gold-chip">{p.tag}</span>
                <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-gold transition-colors">
                {p.title}
              </h3>
              <p className="font-body text-sm text-foreground/70 leading-relaxed mb-5 flex-grow">
                {p.description}
              </p>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 font-mono text-xs text-foreground/60">
                    <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* SAMPLE DOSSIER */}
      <section className="py-20 border-y border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <DossierCard
                classification={fmcgDossier.classification}
                targetEntity={fmcgDossier.targetEntity}
                healthScore={fmcgDossier.healthScore}
                keyShift={fmcgDossier.keyShift}
                dominantNarrative={fmcgDossier.dominantNarrative}
                topGeographies={fmcgDossier.topGeographies}
                recommendedAction={fmcgDossier.recommendedAction}
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="font-mono text-xs text-gold uppercase tracking-widest">
                Show, Don&apos;t Tell
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">
                This is what an Executive Intelligence Brief looks like.
              </h2>
              <p className="font-body text-base text-foreground/75 leading-relaxed">
                We don&apos;t sell dashboards and raw data dumps. We deliver synthesized, prescriptive
                intelligence: brand health, shift velocity, dominant narratives, geopolitical
                distribution, and a recommended strategic response — presented the way a boardroom
                expects to consume it.
              </p>
              <ul className="space-y-3">
                {[
                  "Brand perception health score across 6 zones",
                  "Velocity: what changed and how fast",
                  "Narrative clustering & influencer attribution",
                  "Prescriptive C-suite strategic recommendation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                    <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/briefs"
                className="inline-flex items-center gap-2 text-gold font-heading font-semibold text-sm hover:text-gold-hover transition-colors"
              >
                Browse all sample dossiers <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GEOPOLITICAL ZONES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs text-gold uppercase tracking-widest mb-3">
            The Nigeria Moat
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">
            6 Geopolitical Zones. Widely Divergent Realities.
          </h2>
          <p className="font-body text-base text-foreground/75 mt-4 leading-relaxed">
            A generic Western sentiment model misreads Nigerian context. We track how perception
            diverges across Kano, Kaduna, Abuja, Lagos, Onitsha, and Port Harcourt — in English,
            Hausa, Yoruba, Igbo, and Pidgin.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((z) => (
            <div key={z.id} className="rounded-xl border border-border bg-surface/80 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-semibold text-sm">{z.name}</span>
                <span className="gold-chip">{z.shortCode}</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-foreground/50 mb-2">
                <span>Price Sens</span>
                <span className="text-negative">{z.activeIndices.priceSensitivity}</span>
              </div>
              <div className="h-1.5 w-full bg-elevated rounded-full mb-1 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${z.activeIndices.priceSensitivity}%`,
                    backgroundColor:
                      z.activeIndices.priceSensitivity > 75
                        ? "rgb(var(--negative))"
                        : z.activeIndices.priceSensitivity > 65
                        ? "rgb(var(--gold))"
                        : "rgb(var(--positive))",
                  }}
                />
              </div>
              <p className="font-body text-xs text-foreground/65 leading-relaxed mt-3">
                {z.currentPrimaryNarrative}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SNAPSHOT */}
      <section className="py-20 border-t border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="font-mono text-xs text-gold uppercase tracking-widest mb-3">
              Engagement Ladder
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">
              Start With a Wealth of Options
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl border p-7 ${
                  tier.highlighted
                    ? "border-gold bg-elevated shadow-xl shadow-gold/10"
                    : "border-border bg-surface/80"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                    {tier.layer}
                  </span>
                  {tier.badge && (
                    <span className="gold-chip">{tier.badge}</span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{tier.name}</h3>
                <div className="mb-5">
                  <span className="font-heading font-extrabold text-2xl text-gold">{tier.price}</span>
                  <span className="font-mono text-xs text-foreground/50 block mt-0.5">{tier.period}</span>
                </div>
                <p className="font-body text-xs text-foreground/70 leading-relaxed mb-4">
                  {tier.description}
                </p>
                <Link
                  href="/pricing"
                  className={`inline-flex items-center gap-2 text-xs font-heading font-bold ${
                    tier.highlighted ? "text-gold" : "text-foreground/80 hover:text-foreground"
                  } transition-colors`}
                >
                  {tier.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-elevated to-card p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgb(var(--gold)_/_0.1),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <div className="font-mono text-xs text-gold uppercase tracking-widest mb-3">
              Weekly Free Intelligence
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight mb-4">
              The Nigeria Intelligence Digest
            </h2>
            <p className="font-body text-base text-foreground/75 max-w-xl mx-auto mb-8 leading-relaxed">
              Read by leaders in Banking, FMCG, and Governance. Each week, the sharpest signals
              across Nigeria&apos;s commercial, political, and economic landscape — distilled.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}