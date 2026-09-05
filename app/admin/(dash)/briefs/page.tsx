import { getBriefRequests } from "@/lib/admin-data";
import BriefManager from "./brief-manager";

export default async function AdminBriefsPage() {
  const briefs = await getBriefRequests();

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-heading font-bold text-xl tracking-tight">Brief / Lead Requests</h2>
        <p className="font-body text-sm text-foreground/60 mt-1">
          Portfolios &amp; intelligence brief requests submitted from the confidential desk.
        </p>
      </div>

      <BriefManager briefs={briefs} />
    </div>
  );
}
