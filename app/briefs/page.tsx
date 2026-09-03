import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { DossierCard } from "@/components/intelligence/dossier-card";
import { SAMPLE_DOSSIERS } from "@/lib/data/sample-dossiers";
import { ArrowRight } from "lucide-react";

export default function BriefsPage() {
  const dossiers = Object.values(SAMPLE_DOSSIERS);

  return (
    <>
      <PageHeader
        eyebrow="Sample Intelligence"
        title="Sample Executive Dossiers"
        subtitle="We don't sell abstract promises — we sell tangible intelligence reports. Review how we package insight, velocity, and prescription for real decisions."
        cta={{
          label: "Commission a Dossier for Your Organization",
          href: "/contact",
        }}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {dossiers.map((d) => (
            <div key={d.id} className="space-y-4">
              <DossierCard
                classification={d.classification}
                targetEntity={d.targetEntity}
                healthScore={d.healthScore}
                keyShift={d.keyShift}
                dominantNarrative={d.dominantNarrative}
                topGeographies={d.topGeographies}
                recommendedAction={d.recommendedAction}
                trend={d.trend}
                regionalSentiment={d.regionalSentiment}
              />
              <div className="flex items-center justify-between px-2">
                <span className="font-mono text-xs text-foreground/50">
                  {d.date} // {d.sector}
                </span>
                <Link
                  href="/contact"
                  className="link-gold"
                >
                  Request similar <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}