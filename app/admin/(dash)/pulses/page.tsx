import { getPulses } from "@/lib/admin-data";
import PulseManager from "./pulse-manager";
import { BroadcastHistory } from "./broadcast-history";

export default async function AdminPulsesPage() {
  const pulses = await getPulses();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading font-bold text-xl tracking-tight">Fozill Pulse & Outbound Dispatch</h2>
        <p className="font-body text-sm text-foreground/60 mt-1">
          Compose weekly market-mood issues, preview luxury executive email digests, and broadcast directly to active subscribers.
        </p>
      </div>

      <PulseManager pulses={pulses} />

      {/* Outbound Broadcast & Retention Audit Log */}
      <BroadcastHistory />
    </div>
  );
}
