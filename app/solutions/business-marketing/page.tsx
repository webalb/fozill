import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { DossierCard } from "@/components/intelligence/dossier-card";
import { SAMPLE_DOSSIERS } from "@/lib/data/sample-dossiers";
import { ArrowRight, Radar, ShieldAlert, Users } from "lucide-react";

const useCases = [
  {
    icon: Radar,
    title: "Competitor Momentum Radar",
    body: "Know when a rival product is gaining organic traction on TikTok, X, and community forums — before it shows up in Nielsen or quarterly sales.",
  },
  {
    icon: ShieldAlert,
    title: "Brand Crisis Early Warning",
    body: "Detect escalating customer dissatisfaction across social, review, and marketplace channels before mainstream media picks it up.",
  },
  {
    icon: Users,
    title: "Influencer ROI & Network Impact",
    body: "Separate paid superficial engagement from real community sentiment drivers, so marketing spends move conversations.",
  },
];

const deliverables = [
  "Daily executive intelligence email digest",
  "Competitor battlecards & campaign tracking",
  "Monthly brand health audit",
  "Crisis escalation alerts (<15 min window)",
  "Multi-lingual sentiment (Hausa, Pidgin, Yoruba, Igbo)",
];

export default function BusinessMarketingPage() {
  const dossier = SAMPLE_DOSSIERS["fmcg"];

  return (
    <>
      <PageHeader
        eyebrow="Strategic Pillar 01 // Business & Marketing"
        title="Business & Marketing Intelligence"
        subtitle="Brand health tracking, competitor early warning, and sentiment shift detection across Nigeria's most competitive commercial corridors — distilled into executive action."
        cta={{
          label: "Request a Brand Baseline Report",
          href: "/contact",
        }}
      />

      {/* Use cases */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div key={uc.title} className="rounded-2xl border border-[#2C3138] bg-[#181B1E]/80 p-7">
                <Icon className="w-6 h-6 text-[#D8A83E] mb-4" />
                <h2 className="font-heading font-bold text-lg mb-2">{uc.title}</h2>
                <p className="font-body text-sm text-[#F5F5F2]/70 leading-relaxed">{uc.body}</p>
              </div>
            );
          })}
        </div>

        {/* Sample dossier showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
          <DossierCard
            classification={dossier.classification}
            targetEntity={dossier.targetEntity}
            healthScore={dossier.healthScore}
            keyShift={dossier.keyShift}
            dominantNarrative={dossier.dominantNarrative}
            topGeographies={dossier.topGeographies}
            recommendedAction={dossier.recommendedAction}
          />
          <div className="space-y-6">
            <div className="font-mono text-xs text-[#D8A83E] uppercase tracking-widest">
              Deliverables
            </div>
            <h2 className="font-heading font-bold text-3xl tracking-tight">
              What you receive on retainer
            </h2>
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 font-body text-sm text-[#F5F5F2]/80 border-b border-[#2C3138] pb-3"
                >
                  <ArrowRight className="w-4 h-4 text-[#D8A83E] shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-[#D8A83E] font-heading font-semibold text-sm hover:text-[#F3CB6C] transition-colors"
            >
              View retainer pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}