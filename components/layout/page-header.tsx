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
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--gold)_/_0.08),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl space-y-6">
          <div className="font-mono text-xs text-gold uppercase tracking-widest">
            {eyebrow}
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight leading-[1.08]">
            {title}
          </h1>
          <p className="font-body text-lg text-foreground/75 leading-relaxed">{subtitle}</p>
          {cta && (
            <Link href={cta.href} className="btn-gold">
              {cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}