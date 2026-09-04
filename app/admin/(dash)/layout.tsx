import Link from "next/link";
import { requireAdmin } from "@/app/actions/admin-auth";
import AdminNav from "../admin-nav";

export const metadata = {
  title: "Admin · Fozill",
};

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  let authed = true;
  try {
    await requireAdmin();
  } catch {
    authed = false;
  }

  // Middleware already gates; if we get here unauthenticated, fall back to login.
  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="font-mono text-sm text-foreground/70">Please sign in to continue.</p>
        <Link
          href="/admin/login"
          className="px-4 py-2 rounded-lg bg-gold text-background font-heading font-bold text-sm"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <Link href="/admin" className="font-mono text-xs text-gold uppercase tracking-widest">
          Fozill Ops Console
        </Link>
        <h1 className="font-heading font-bold text-3xl tracking-tight mt-1">Dashboard</h1>
      </header>
      <AdminNav />
      <main className="mt-8">{children}</main>
    </div>
  );
}
