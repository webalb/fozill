import { getPulses } from "@/lib/admin-data";
import PulseManager from "./pulse-manager";

export default async function AdminPulsesPage() {
  const pulses = await getPulses();

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading font-bold text-xl tracking-tight">Fozill Pulse</h2>
        <p className="font-body text-sm text-foreground/60 mt-1">
          Compose weekly market-mood issues. Each issue holds Pulse items; mark items premium to gate them.
        </p>
      </div>

      <PulseManager pulses={pulses} />
    </div>
  );
}
