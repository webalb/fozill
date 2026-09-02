import { PageHeader } from "@/components/layout/page-header";
import { Database, MessageSquare, Globe, Users, Brain, ShieldCheck } from "lucide-react";

const pipeline = [
  {
    icon: Database,
    title: "SOCMINT & Web Data",
    body: "Continuous ingestion of public discourse across X, TikTok, Facebook, local radio, forums, news, and corporate/public datasets.",
  },
  {
    icon: MessageSquare,
    title: "Localized NLP & Entity Resolution",
    body: "Models tuned for English, Hausa, Yoruba, Igbo, Fulfulde, and Nigerian Pidgin. We understand context, not just keywords.",
  },
  {
    icon: Globe,
    title: "Narrative & Network Mapping",
    body: "Cluster topics, attribute narratives to initiating actors, and map amplification — separating organic community drivers from paid astroturfing.",
  },
  {
    icon: Brain,
    title: "AI-Assisted Analysis",
    body: "LLMs surface emerging patterns, anomalies, and velocity shifts for analyst review — never as the final word.",
  },
  {
    icon: Users,
    title: "Human Intelligence Review",
    body: "Senior analysts validate claims, weigh context, stress-test conclusions, and add what machines miss.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Methodology & Moat"
        title="Why Generic Western Tools Fail in Nigeria"
        subtitle="A platform that monitors mentions is a commodity. One that understands Nigeria — its languages, institutions, regions, and cultural subtext — is a moat."
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <div className="font-mono text-xs text-gold uppercase tracking-widest">
              The Context Problem
            </div>
            <h2 className="font-heading font-bold text-3xl tracking-tight">
              “This thing don cost.”
            </h2>
            <p className="font-body text-base text-foreground/75 leading-relaxed">
              A generic American sentiment model reads this line as simply negative. But what does
              it really signal — price sensitivity, sarcasm, political criticism, product quality
              discourse, or a brand opportunity? Understanding that difference is exactly what
              separates noise from intelligence.
            </p>
            <p className="font-body text-base text-foreground/75 leading-relaxed">
              We built Fozill to understand Nigerian Pidgin, Hausa cultural discourse, regional
              slang, our institutions, our media ecosystem, and dark social distribution. That
              localization is the product.
            </p>
            <blockquote className="border-l-2 border-gold pl-5 font-body italic text-foreground/85 leading-relaxed">
              “We turn Nigeria's fragmented public information into strategic, high-stakes
              intelligence for business, political, and economic leaders.”
            </blockquote>
          </div>

          <div className="rounded-2xl border border-border bg-surface/80 p-8">
            <div className="font-mono text-xs text-gold uppercase tracking-widest mb-6">
              Our Intelligence Pipeline
            </div>
            <ol className="space-y-0">
              {pipeline.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="flex gap-5 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-lg border border-gold/40 bg-elevated flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      {idx < pipeline.length - 1 && (
                        <div className="w-px flex-1 bg-border my-2" />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading font-bold text-sm">{step.title}</span>
                        <span className="font-mono text-[10px] text-foreground/40">
                          STEP {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="font-body text-sm text-foreground/70 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-gold/30 bg-gradient-to-br from-elevated to-card p-10">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Ethical & Legal Standards</h3>
              <p className="font-body text-sm text-foreground/75 leading-relaxed max-w-3xl">
                Fozill strictly operates via Open Source Intelligence (OSINT), public web discourse,
                broadcast monitoring, and aggregated sentiment synthesis in compliance with Nigeria's
                Data Protection Regulation (NDPR) and ethical standards. We do not engage in
                surveillance, intrusion, or acquisition of non-public data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}