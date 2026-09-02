import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { PRICING_TIERS } from "@/lib/data/pricing-tiers";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engagement & Pricing"
        title="Four Ways to Engage"
        subtitle="A transparent, progressive route from project-based intel to full strategic partnership. Every engagement is governed by a mutual NDA."
        cta={{
          label: "Book a Confidential Discovery Call",
          href: "/contact",
        }}
      />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl border p-8 flex flex-col ${
                tier.highlighted
                  ? "border-gold bg-elevated shadow-xl shadow-gold/10 lg:scale-[1.02]"
                  : "border-border bg-surface/80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                  {tier.layer}
                </span>
                {tier.badge && (
                  <span className="gold-chip rounded-full">
                    {tier.badge}
                  </span>
                )}
              </div>
              <h2 className="font-heading font-bold text-xl mb-1">{tier.name}</h2>
              <div className="mb-4">
                <span className="font-heading font-extrabold text-3xl text-gold">
                  {tier.price}
                </span>
                <span className="font-mono text-xs text-foreground/50 block mt-1">{tier.period}</span>
              </div>
              <p className="font-body text-sm text-foreground/75 leading-relaxed mb-6">
                {tier.description}
              </p>
              <div className="mb-2 font-mono text-xs text-foreground/50 uppercase tracking-wider">
                Ideal for: {tier.idealFor}
              </div>
              <ul className="space-y-2.5 mb-8 flex-grow">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-heading font-bold transition-all ${
                  tier.highlighted
                    ? "bg-gold text-background hover:bg-gold-hover"
                    : "border border-border text-foreground hover:border-gold/50 hover:bg-elevated"
                }`}
              >
                {tier.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}