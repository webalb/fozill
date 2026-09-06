import Link from "next/link";
import { requireAdmin } from "@/app/actions/admin-auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin Console · Fozill Strategic Intelligence",
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center bg-background">
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

  return <AdminShell>{children}</AdminShell>;
}
