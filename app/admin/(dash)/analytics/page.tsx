import { getVisitAnalytics } from "@/lib/admin-data";
import VisitsChart from "./visits-chart";

export default async function AdminAnalyticsPage() {
  const analytics = await getVisitAnalytics();

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-heading font-bold text-xl tracking-tight">Page Analytics</h2>
        <p className="font-body text-sm text-foreground/60 mt-1">
          {analytics.total} tracked visits across the site.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 p-5 mb-6">
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-4">
          Visits · last 7 days
        </h3>
        <VisitsChart data={analytics.last7} />
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 p-5">
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-4">
          Top paths
        </h3>
        <div className="space-y-2">
          {analytics.byPath.map((p) => {
            const pct = analytics.total ? Math.round((p.count / analytics.total) * 100) : 0;
            return (
              <div key={p.path}>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="truncate text-foreground/80">{p.path}</span>
                  <span className="text-foreground/50">{p.count}</span>
                </div>
                <div className="h-2 rounded-full bg-foreground/10">
                  <div className="h-2 rounded-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
          {analytics.byPath.length === 0 && (
            <p className="font-body text-sm text-foreground/40 py-4 text-center">No visits recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
