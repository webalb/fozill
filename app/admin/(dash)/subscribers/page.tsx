import { getSubscribers } from "@/lib/admin-data";
import SubscriberManager from "./subscriber-manager";

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-xl tracking-tight">Newsletter Subscribers</h2>
          <p className="font-body text-sm text-foreground/60 mt-1">
            Active corporate &amp; institutional executive digest distribution list.
          </p>
        </div>
        <span className="font-mono text-xs text-foreground/50 bg-surface px-3 py-1.5 rounded-lg border border-border">
          {subscribers.length} total
        </span>
      </div>

      <SubscriberManager subscribers={subscribers} />
    </div>
  );
}
