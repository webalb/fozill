import React from "react";
import Link from "next/link";
import { Shield, ArrowUpRight, Lock, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0C0E10] border-t border-[#2C3138] text-[#F5F5F2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C3138]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#181B1E] border border-[#D8A83E]/40 flex items-center justify-center text-[#D8A83E]">
                <Shield className="w-4 h-4 text-[#D8A83E]" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-wider text-[#F5F5F2]">
                FOZILL<span className="text-[#D8A83E]">.</span>
              </span>
            </Link>

            <p className="font-body text-sm text-[#F5F5F2]/70 leading-relaxed max-w-sm">
              We turn Nigeria&apos;s fragmented public discourse, digital media, regional sentiment, and economic signals into high-stakes intelligence for business, political, and institutional leaders.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-[#D8A83E]">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>NIGERIA INTELLIGENCE DESK ACTIVE • 36 STATES + FCT</span>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#D8A83E]">
              Strategic Pillars
            </h4>
            <ul className="space-y-2.5 font-heading text-sm text-[#F5F5F2]/70">
              <li>
                <Link href="/solutions/business-marketing" className="hover:text-white transition-colors">
                  Business & Marketing
                </Link>
              </li>
              <li>
                <Link href="/solutions/political-identity" className="hover:text-white transition-colors">
                  Political Perception
                </Link>
              </li>
              <li>
                <Link href="/solutions/economic-intelligence" className="hover:text-white transition-colors">
                  Economic & Sector Intel
                </Link>
              </li>
              <li>
                <Link href="/portal/demo" className="hover:text-[#D8A83E] transition-colors flex items-center gap-1">
                  <span>Interactive Terminal</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D8A83E]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Intel */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#D8A83E]">
              Intelligence Hub
            </h4>
            <ul className="space-y-2.5 font-heading text-sm text-[#F5F5F2]/70">
              <li>
                <Link href="/briefs" className="hover:text-white transition-colors">
                  Sample Executive Dossiers
                </Link>
              </li>
              <li>
                <Link href="/indices" className="hover:text-white transition-colors">
                  Nigeria Consumer Pressure Index
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Methodology & NLP Moat
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing & Retainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Verification */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#D8A83E]">
              Confidential Desk
            </h4>
            <ul className="space-y-2.5 font-body text-xs text-[#F5F5F2]/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8A83E] shrink-0 mt-0.5" />
                <span>Lagos • Abuja • Kano</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D8A83E] shrink-0" />
                <span>briefs@fozill.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8A83E] shrink-0" />
                <span>+234 (0) 800-FOZILL</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-[#D8A83E] hover:underline"
                >
                  <Lock className="w-3 h-3" />
                  <span>Request NDA Briefing</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & OSINT Ethics Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F5F5F2]/50">
          <p>© {new Date().getFullYear()} Fozill Intelligence Technologies Ltd. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right text-[11px] leading-relaxed">
            Fozill strictly operates via Open Source Intelligence (OSINT), public web discourse, broadcast monitoring, and aggregated sentiment synthesis in compliance with NDPR and Nigerian ethical standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
