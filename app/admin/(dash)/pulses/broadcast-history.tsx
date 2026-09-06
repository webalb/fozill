"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, Clock, MailOpen, AlertCircle, RefreshCw } from "lucide-react";
import { getBroadcastHistory, BroadcastHistoryItem } from "@/app/actions/broadcast";

export function BroadcastHistory() {
  const [history, setHistory] = useState<BroadcastHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    setLoading(true);
    getBroadcastHistory()
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error fetching broadcast history:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-gold" />
          <h3 className="font-heading font-bold text-base text-foreground tracking-tight">
            Broadcast Dispatches & Retention History
          </h3>
        </div>
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border text-xs font-mono text-foreground/60 hover:text-foreground hover:bg-surface transition-colors disabled:opacity-50"
          title="Refresh history"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <p className="font-body text-xs text-foreground/60">
        Audit log of all weekly pulse dispatches sent to subscribers, including open telemetry.
      </p>

      {loading ? (
        <div className="py-8 text-center font-mono text-xs text-foreground/40">
          Loading broadcast telemetry…
        </div>
      ) : history.length === 0 ? (
        <div className="py-8 text-center font-mono text-xs text-foreground/40 border border-dashed border-border rounded-xl">
          No broadcast dispatches executed yet. Use &ldquo;Broadcast Issue&rdquo; on any published pulse.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border/80 text-foreground/40 uppercase tracking-widest text-[10px]">
                <th className="pb-2.5">Date & Time</th>
                <th className="pb-2.5">Pulse Issue</th>
                <th className="pb-2.5">Recipients</th>
                <th className="pb-2.5">Open Telemetry</th>
                <th className="pb-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {history.map((item) => {
                const openRate = item.recipient_count > 0
                  ? ((item.opens_count / item.recipient_count) * 100).toFixed(1)
                  : "0.0";

                return (
                  <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-3 text-foreground/70 whitespace-nowrap">
                      {new Date(item.occurred_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 font-heading font-semibold text-foreground">
                      {item.pulse_title || item.digest_slug}
                    </td>
                    <td className="py-3 text-foreground/80">
                      {item.recipient_count} subscriber{item.recipient_count === 1 ? "" : "s"}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5 text-gold">
                        <MailOpen className="w-3.5 h-3.5" />
                        <span>{item.opens_count} opens ({openRate}%)</span>
                      </div>
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider ${
                        item.is_simulated
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      }`}>
                        {item.is_simulated ? "Simulated Send" : "Dispatched"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
