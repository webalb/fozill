"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  Zap,
  FileText,
  Users,
  BarChart3,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { logoutAdmin } from "@/app/actions/admin-auth";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  external?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Intelligence Operations",
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/admin/signals", label: "Signals Radar", icon: Radio },
      { href: "/admin/pulses", label: "Market Pulses", icon: Zap },
      { href: "/admin/briefs", label: "Executive Briefs", icon: FileText },
    ],
  },
  {
    title: "Audience & Telemetry",
    items: [
      { href: "/admin/subscribers", label: "Subscribers", icon: Users },
      { href: "/admin/analytics", label: "Traffic & Telemetry", icon: BarChart3 },
    ],
  },
  {
    title: "Public Portals",
    items: [
      { href: "/signals", label: "Live Signals Feed", icon: ExternalLink, external: true },
      { href: "/indices", label: "Global Indices", icon: ExternalLink, external: true },
      { href: "/", label: "Main Platform", icon: ExternalLink, external: true },
    ],
  },
];

export function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setSigningOut(true);
      await logoutAdmin();
      router.push("/admin/login");
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const content = (
    <div className="flex flex-col h-full bg-panel border-r border-panel-border text-foreground select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-panel-border flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <Image
            src="/logo-navbar.webp"
            alt="Fozill logo"
            width={34}
            height={34}
            className="w-8 h-8 object-contain shrink-0 group-hover:opacity-90 transition-opacity"
            unoptimized
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-base tracking-wider text-foreground group-hover:text-gold transition-colors">
                FOZILL<span className="text-gold">.</span>
              </span>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] bg-gold/15 text-gold font-bold uppercase tracking-wider">
                OPS v2.5
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-foreground/50 uppercase">
              Strategic Command Center
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg border border-panel-border text-foreground/60 hover:text-foreground hover:bg-panel-hover transition-colors"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Live System Status Pill */}
      <div className="px-4 py-2.5 bg-panel-strong border-b border-panel-border/80 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold tracking-wider">LIVE ENGINE</span>
        </div>
        <div className="flex items-center gap-1 text-gold/80">
          <ShieldCheck className="w-3 h-3 text-gold" />
          <span className="text-[10px]">RLS LOCKED</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 font-mono text-[10px] font-semibold tracking-wider text-foreground/40 uppercase mb-2">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = !item.external && isActive(item.href, item.exact);

                if (item.external) {
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-foreground/60 hover:text-foreground hover:bg-panel-hover transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-foreground/40 group-hover:text-gold transition-colors" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-foreground/30 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        active
                          ? "bg-gold/15 text-gold font-semibold border border-gold/30 shadow-[0_0_15px_rgba(216,168,62,0.1)]"
                          : "text-foreground/70 hover:text-foreground hover:bg-panel-hover border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-3.5 h-3.5 transition-colors ${
                            active ? "text-gold" : "text-foreground/40 group-hover:text-foreground"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Operator Profile & Sign Out Footer */}
      <div className="p-3 border-t border-panel-border bg-panel-strong">
        <div className="flex items-center justify-between p-2 rounded-lg bg-panel-strong border border-panel-border">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-heading font-bold text-xs shrink-0">
              FO
            </div>
            <div className="min-w-0">
              <div className="font-heading font-semibold text-xs text-foreground truncate">
                Analyst Console
              </div>
              <div className="font-mono text-[10px] text-foreground/50 truncate">
                hello@fozill.com
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="p-1.5 rounded-md text-foreground/50 hover:text-negative hover:bg-negative/10 border border-transparent hover:border-negative/20 transition-all shrink-0"
            title="Sign out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (w-64) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />
          {/* Slide-over Drawer */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-panel z-50">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
