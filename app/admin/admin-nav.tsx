"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/actions/admin-auth";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/briefs", label: "Briefs" },
  { href: "/admin/signals", label: "Signals" },
  { href: "/admin/pulses", label: "Pulses" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <nav className="flex flex-wrap items-center gap-1 border-b border-border pb-px">
      {links.map((l) => {
        const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={
              "px-3 py-2 rounded-t-lg font-mono text-sm transition-colors " +
              (active
                ? "bg-gold/10 text-gold border-b-2 border-gold"
                : "text-foreground/60 hover:text-foreground")
            }
          >
            {l.label}
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="px-3 py-2 ml-auto font-mono text-sm text-foreground/40 hover:text-negative transition-colors"
      >
        Sign out
      </button>
    </nav>
  );
}
