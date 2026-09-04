import { getSubscribers } from "@/lib/admin-data";

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl tracking-tight">Newsletter Subscribers</h2>
        <span className="font-mono text-xs text-foreground/50">{subscribers.length} total</span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface/60">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border font-mono text-xs text-foreground/50 uppercase tracking-widest">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s: any) => (
              <tr key={s.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-body text-sm">{s.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      "rounded-full px-2 py-0.5 font-mono text-xs " +
                      (s.status === "active"
                        ? "bg-positive/15 text-positive"
                        : "bg-foreground/10 text-foreground/50")
                    }
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-foreground/50">
                  {new Date(s.subscribed_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center font-body text-sm text-foreground/40">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
