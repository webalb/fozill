import { getSignals } from "@/lib/admin-data";
import SignalManager from "./signal-manager";

export default async function AdminSignalsPage() {
  const signals = await getSignals();

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-xl tracking-tight">Intelligence Signals</h2>
        <p className="font-body text-sm text-foreground/60 mt-1">
          Draft and publish Fozill Signals. Toggle the premium flag to gate the complete report.
        </p>
      </div>

      <SignalManager signals={signals} />
    </div>
  );
}
