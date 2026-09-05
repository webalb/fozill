"use client";

import { useTransition } from "react";
import { updateSubscriberStatus, deleteSubscriber } from "@/app/actions/admin-ops";
import { Trash2, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function SubscriberManager({ subscribers }: { subscribers: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: any) => {
    startTransition(async () => {
      await updateSubscriberStatus(id, newStatus);
    });
  };

  const handleDelete = (id: string, email: string) => {
    if (confirm(`Are you sure you want to remove subscriber "${email}"?`)) {
      startTransition(async () => {
        await deleteSubscriber(id);
      });
    }
  };

  const copyEmail = (id: string, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface/60">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border font-mono text-xs text-foreground/50 uppercase tracking-widest">
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Subscribed</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s: any) => (
            <tr key={s.id} className="border-b border-border/60 last:border-0 hover:bg-elevated/40 transition-colors">
              <td className="px-4 py-3 font-body text-sm text-foreground flex items-center gap-2">
                <span>{s.email}</span>
                <button
                  onClick={() => copyEmail(s.id, s.email)}
                  className="text-foreground/40 hover:text-gold transition-colors"
                  title="Copy email"
                >
                  {copiedId === s.id ? <Check className="w-3.5 h-3.5 text-positive" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </td>
              <td className="px-4 py-3">
                <select
                  value={s.status}
                  disabled={isPending}
                  onChange={(e) => handleStatusChange(s.id, e.target.value)}
                  className={`px-2.5 py-1 rounded-md font-mono text-xs border cursor-pointer focus:outline-none ${
                    s.status === "active"
                      ? "bg-positive/10 text-positive border-positive/30"
                      : s.status === "unsubscribed"
                      ? "bg-foreground/10 text-foreground/50 border-border"
                      : "bg-negative/10 text-negative border-negative/30"
                  }`}
                >
                  <option value="active">Active</option>
                  <option value="unsubscribed">Unsubscribed</option>
                  <option value="bounced">Bounced</option>
                </select>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-foreground/50">
                {new Date(s.subscribed_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleDelete(s.id, s.email)}
                  disabled={isPending}
                  className="p-1.5 rounded-lg border border-border bg-surface text-foreground/60 hover:text-negative hover:border-negative/40 transition-colors inline-flex items-center"
                  title="Delete subscriber"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
          {subscribers.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center font-body text-sm text-foreground/40">
                No subscribers recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
