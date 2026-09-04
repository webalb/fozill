import { getBriefRequests } from "@/lib/admin-data";

export default async function AdminBriefsPage() {
  const briefs = await getBriefRequests();

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-heading font-bold text-xl tracking-tight">Brief / Lead Requests</h2>
        <p className="font-body text-sm text-foreground/60 mt-1">
          Portfolios &amp; intelligence brief requests submitted from the site.
        </p>
      </div>

      <div className="space-y-4">
        {briefs.map((b: any) => (
          <div key={b.id} className="rounded-2xl border border-border bg-surface/60 p-5">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <div className="font-heading font-bold text-lg tracking-tight">{b.full_name || "Anonymous"}</div>
                <div className="font-mono text-xs text-foreground/50">
                  {b.work_email} · {b.organization}
                  {b.phone ? ` · ${b.phone}` : ""}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[b.category, b.engagement_type, b.target_entity]
                    .filter(Boolean)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-foreground/10 px-2 py-0.5 font-mono text-[11px] text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={
                    "rounded-full px-2 py-0.5 font-mono text-xs " +
                    (b.status === "new"
                      ? "bg-gold/20 text-gold"
                      : b.status === "replied"
                      ? "bg-positive/15 text-positive"
                      : "bg-foreground/10 text-foreground/50")
                  }
                >
                  {b.status}
                </span>
                <span className="font-mono text-[11px] text-foreground/40">
                  {new Date(b.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            {b.notes && (
              <p className="font-body text-sm text-foreground/80 whitespace-pre-wrap">{b.notes}</p>
            )}
          </div>
        ))}
        {briefs.length === 0 && (
          <p className="font-body text-sm text-foreground/40 py-8 text-center">
            No brief requests yet.
          </p>
        )}
      </div>
    </div>
  );
}
