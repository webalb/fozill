import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta?: { label: string; href: string };
}

export function PageHeader({ eyebrow, title, subtitle, cta }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#2C3138]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(216,168,62,0.08),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl space-y-6">
          <div className="font-mono text-xs text-[#D8A83E] uppercase tracking-widest">
            {eyebrow}
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight leading-[1.08]">
            {title}
          </h1>
          <p className="font-body text-lg text-[#F5F5F2]/75 leading-relaxed">{subtitle}</p>
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D8A83E] text-[#111315] font-heading font-bold text-sm hover:bg-[#F3CB6C] transition-all shadow-lg shadow-[#D8A83E]/20"
            >
              {cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}