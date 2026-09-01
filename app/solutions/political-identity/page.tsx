import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { DossierCard } from "@/components/intelligence/dossier-card";
import { SAMPLE_DOSSIERS } from "@/lib/data/sample-dossiers";
import { MapPin, Crosshair, Repeat } from "lucide-react";

const capabilities = [
  {
    icon: MapPin,
    title: "Regional & Geopolitical Comparison",
    body: "Perception sentinel across all 36 states + FCT. See how a figure or policy is received in Kano versus Kaduna, Lagos versus Port Harcourt.",
  },
  {
    icon: Crosshair,
    title: "Narrative Attribution",
    body: "Who initiated a smear or organic rumor? Which 5 accounts amplified it? We map the network, not just the posts.",
  },
  {
    icon: Repeat,
    title: "Counter-Narrative Testing",
    body: "Before you release a statement, we model how it will land across language corridors and community segments.",
  },
];

export default function PoliticalIdentityPage() {
  const dossier = SAMPLE_DOSSIERS["political"];

  return (
    <>
      <PageHeader
        eyebrow="Strategic Pillar 02 // Political & Public Identity"
        title="Political & Brand Identity Intelligence"
        subtitle="This is not a social media boosting agency. We provide the perception intelligence layer underneath political strategy — across languages, regions, and influencer networks."
        cta={{
          label: "Discuss the 2027 Election Window",
          href: "/contact",
        }}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl border border-[#2C3138] bg-[#181B1E]/80 p-7">
                <Icon className="w-6 h-6 text-[#D8A83E] mb-4" />
                <h2 className="font-heading font-bold text-lg mb-2">{c.title}</h2>
                <p className="font-body text-sm text-[#F5F5F2]/70 leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>

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
              2027 Election Cycle
            </div>
            <h2 className="font-heading font-bold text-3xl tracking-tight">
              Data-driven grassroots issue tracking
            </h2>
            <p className="font-body text-base text-[#F5F5F2]/75 leading-relaxed">
              Campaigns win on perception of issues, not just media reach. We track voter sentiment,
              grassroots issue clustering, and narrative velocity in real time — in English, Hausa,
              Yoruba, Igbo, and Nigerian Pidgin — so strategy responds to what communities actually
              feel.
            </p>
            <ul className="space-y-3">
              {[
                "Track sentiment by state, zone, and language",
                "Detect coordinated bot clusters & astroturfing",
                "Attribute narratives to initiating actors",
                "Model counter-narrative effectiveness pre-launch",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-body text-sm text-[#F5F5F2]/80 border-b border-[#2C3138] pb-3"
                >
                  <ArrowRightIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowRightIcon() {
  return (
    <span className="flex h-4 w-4 text-[#D8A83E] shrink-0 mt-0.5">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
  );
}