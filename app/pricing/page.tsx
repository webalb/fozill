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
                  ? "border-[#D8A83E] bg-[#202428] shadow-xl shadow-[#D8A83E]/10 lg:scale-[1.02]"
                  : "border-[#2C3138] bg-[#181B1E]/80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5F2]/50">
                  {tier.layer}
                </span>
                {tier.badge && (
                  <span className="font-mono text-[10px] text-[#D8A83E] px-2 py-0.5 bg-[#D8A83E]/10 border border-[#D8A83E]/30 rounded-full">
                    {tier.badge}
                  </span>
                )}
              </div>
              <h2 className="font-heading font-bold text-xl mb-1">{tier.name}</h2>
              <div className="mb-4">
                <span className="font-heading font-extrabold text-3xl text-[#D8A83E]">
                  {tier.price}
                </span>
                <span className="font-mono text-xs text-[#F5F5F2]/50 block mt-1">{tier.period}</span>
              </div>
              <p className="font-body text-sm text-[#F5F5F2]/75 leading-relaxed mb-6">
                {tier.description}
              </p>
              <div className="mb-2 font-mono text-xs text-[#F5F5F2]/50 uppercase tracking-wider">
                Ideal for: {tier.idealFor}
              </div>
              <ul className="space-y-2.5 mb-8 flex-grow">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-body text-sm text-[#F5F5F2]/80">
                    <Check className="w-4 h-4 text-[#D8A83E] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-heading font-bold transition-all ${
                  tier.highlighted
                    ? "bg-[#D8A83E] text-[#111315] hover:bg-[#F3CB6C]"
                    : "border border-[#2C3138] text-[#F5F5F2] hover:border-[#D8A83E]/50 hover:bg-[#202428]"
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