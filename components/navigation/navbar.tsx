"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, ChevronDown, Menu, X, ArrowRight, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Live Dossiers", href: "/briefs" },
    { name: "Nigeria Indices", href: "/indices" },
    { name: "Methodology", href: "/about" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-surface to-card border border-gold/40 flex items-center justify-center shadow-sm group-hover:border-gold transition-all">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-wider text-foreground group-hover:text-gold transition-colors">
                FOZILL<span className="text-gold">.</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-gold/80 uppercase -mt-1">
                Strategic Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md font-heading text-sm font-medium transition-colors ${
                  pathname.startsWith("/solutions")
                    ? "text-gold"
                    : "text-foreground/80 hover:text-foreground hover:bg-surface"
                }`}
              >
                <span>Intelligence Pillars</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? "rotate-180 text-gold" : ""}`} />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="card-panel-solid p-3 shadow-2xl backdrop-blur-xl">
                    <Link
                      href="/solutions/business-marketing"
                      className="block p-3 rounded-lg hover:bg-elevated transition-colors group"
                      onClick={() => setSolutionsOpen(false)}
                    >
                      <div className="font-heading text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                        Business & Marketing Intelligence
                      </div>
                      <p className="font-body text-xs text-foreground/60 mt-1 leading-relaxed">
                        Brand health tracking, competitor early warning, and sentiment shift detection.
                      </p>
                    </Link>

                    <Link
                      href="/solutions/political-identity"
                      className="block p-3 rounded-lg hover:bg-elevated transition-colors group"
                      onClick={() => setSolutionsOpen(false)}
                    >
                      <div className="font-heading text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                        Political & Identity Intelligence
                      </div>
                      <p className="font-body text-xs text-foreground/60 mt-1 leading-relaxed">
                        Perception mapping across 6 geopolitical zones and multi-lingual narrative attribution.
                      </p>
                    </Link>

                    <Link
                      href="/solutions/economic-intelligence"
                      className="block p-3 rounded-lg hover:bg-elevated transition-colors group"
                      onClick={() => setSolutionsOpen(false)}
                    >
                      <div className="font-heading text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                        Economic & Sector Intelligence
                      </div>
                      <p className="font-body text-xs text-foreground/60 mt-1 leading-relaxed">
                        Nigeria Consumer Pressure Index, price sensitivity trends, and macro signals.
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-md font-heading text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-foreground/80 hover:text-foreground hover:bg-surface"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/portal/demo"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-medium text-gold bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all ml-1"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Demo Terminal</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-gold/20"
            >
              <span>Commission a Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-md bg-gold text-background font-heading font-bold text-xs"
            >
              Order Brief
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground/80 hover:text-foreground bg-surface border border-border"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 bg-background rounded-xl px-2 space-y-2">
            <div className="font-mono text-[10px] text-gold px-3 uppercase tracking-wider">
              Strategic Pillars
            </div>
            <Link
              href="/solutions/business-marketing"
              className="block px-3 py-2 rounded-lg font-heading text-sm text-foreground hover:bg-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Business & Marketing Intelligence
            </Link>
            <Link
              href="/solutions/political-identity"
              className="block px-3 py-2 rounded-lg font-heading text-sm text-foreground hover:bg-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Political & Identity Intelligence
            </Link>
            <Link
              href="/solutions/economic-intelligence"
              className="block px-3 py-2 rounded-lg font-heading text-sm text-foreground hover:bg-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Economic & Sector Intelligence
            </Link>

            <div className="border-t border-border my-2 pt-2" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg font-heading text-sm text-foreground hover:bg-surface"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/portal/demo"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gold/10 border border-gold/30 text-gold font-mono text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Explore Demo Terminal</span>
              <Activity className="w-4 h-4 animate-pulse" />
            </Link>

            <div className="pt-2">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gold text-background font-heading font-bold text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Commission an Executive Brief</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}