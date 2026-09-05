import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Lock, MapPin, Mail, Phone, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-footer border-t border-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-footer.webp"
                alt="Fozill logo"
                width={64}
                height={64}
                className="w-12 h-12 object-contain shrink-0"
                unoptimized
              />
              <span className="font-heading font-extrabold text-xl tracking-wider text-foreground">
                FOZILL<span className="text-gold">.</span>
              </span>
            </Link>

            <p className="font-body text-sm text-foreground/70 leading-relaxed max-w-sm">
              We turn the world&apos;s fragmented public discourse, digital media, regional sentiment,
              and economic signals into high-stakes intelligence for business, political, and
              institutional leaders.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-gold">
              <span className="h-2 w-2 rounded-full bg-positive animate-pulse" />
              <span>GLOBAL INTELLIGENCE DESK ACTIVE • 36 STATES + FCT • WORLDWIDE</span>
            </div>

            <div className="pt-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-foreground/60 mb-3">
                Follow Fozill
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/fozill"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fozill on LinkedIn"
                  className="text-foreground/60 hover:text-gold transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/FozillHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fozill on X"
                  className="text-foreground/60 hover:text-gold transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/people/Fozill/61593702136930/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fozill on Facebook"
                  className="text-foreground/60 hover:text-gold transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/FozillHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fozill on Instagram"
                  className="text-foreground/60 hover:text-gold transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-gold">
              Strategic Pillars
            </h4>
            <ul className="space-y-2.5 font-heading text-sm text-foreground/70">
              <li>
                <Link href="/solutions/business-marketing" className="hover:text-gold transition-colors">
                  Business & Marketing
                </Link>
              </li>
              <li>
                <Link href="/solutions/political-identity" className="hover:text-gold transition-colors">
                  Political Perception
                </Link>
              </li>
              <li>
                <Link href="/solutions/economic-intelligence" className="hover:text-gold transition-colors">
                  Economic & Sector Intel
                </Link>
              </li>
              <li>
                <Link href="/portal/demo" className="hover:text-gold transition-colors flex items-center gap-1">
                  <span>Interactive Terminal</span>
                  <ArrowUpRight className="w-3 h-3 text-gold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Intel */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-gold">
              Intelligence Hub
            </h4>
            <ul className="space-y-2.5 font-heading text-sm text-foreground/70">
              <li>
                <Link href="/signals" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>Live Signal Radar</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-positive animate-pulse" />
                </Link>
              </li>
              <li>
                <Link href="/briefs" className="hover:text-gold transition-colors">
                  Sample Executive Dossiers
                </Link>
              </li>
              <li>
                <Link href="/indices" className="hover:text-gold transition-colors">
                  Nigeria Consumer Pressure Index
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  Methodology & NLP Moat
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold transition-colors">
                  Pricing & Retainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Verification */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-gold">
              Confidential Desk
            </h4>
            <ul className="space-y-2.5 font-body text-xs text-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>Lagos HQ • Abuja • Kano • Global</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>hello@fozill.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>+234 0905 4755 445</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-gold hover:underline"
                >
                  <Lock className="w-3 h-3" />
                  <span>Request NDA Briefing</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & OSINT Ethics Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground/50">
          <p>© {new Date().getFullYear()} Fozill Intelligence Technologies Ltd. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right text-[11px] leading-relaxed">
            Fozill, headquartered in Nigeria, operates globally via Open Source Intelligence (OSINT),
            public web discourse, broadcast monitoring, and aggregated sentiment synthesis in
            compliance with NDPR, GDPR, and applicable ethical standards.
          </p>
        </div>
      </div>
    </footer>
  );
}