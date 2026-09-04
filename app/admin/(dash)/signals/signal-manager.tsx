"use client";

import { useActionState, useTransition } from "react";
import { upsertSignal, setSignalStatus } from "@/app/actions/publish";

export default function SignalManager({ signals }: { signals: any[] }) {
  const [saveState, saveAction, saving] = useActionState(upsertSignal, null);
  const [publishing, startTransition] = useTransition();

  const statusLabel = (s: string) =>
    s === "published" ? "Published" : s === "archived" ? "Archived" : "Draft";

  return (
    <div className="space-y-8">
      <form
        action={saveAction}
        className="rounded-2xl border border-border bg-surface/60 p-5"
      >
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-4">
          New Signal · draft
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Title
            </label>
            <input
              name="title"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
              >
                <option value="business">Business</option>
                <option value="political">Political</option>
                <option value="economic">Economic</option>
                <option value="sector">Sector</option>
                <option value="crisis">Crisis</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
                Direction
              </label>
              <select
                name="direction"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
              >
                <option value="neutral">Neutral</option>
                <option value="up">Up</option>
                <option value="down">Down</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
                Confidence %
              </label>
              <input
                name="confidence"
                type="number"
                min={0}
                max={100}
                defaultValue={50}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Location <span className="text-foreground/30">(optional)</span>
            </label>
            <input
              name="location"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Body
            </label>
            <textarea
              name="body"
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <label className="flex items-center gap-2 font-body text-sm text-foreground/70">
            <input name="premium" type="checkbox" className="accent-gold" />
            Premium (complete-report gated)
          </label>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2.5 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save draft"}
            </button>
            {saveState?.message && (
              <span className="font-mono text-xs text-foreground/60">{saveState.message}</span>
            )}
          </div>
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest">All signals</h3>
        {signals.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-surface/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-heading font-bold tracking-tight">{s.title}</div>
                <div className="font-mono text-[11px] text-foreground/60 mt-0.5">
                  {s.category} · {s.direction} · {s.confidence}% conf
                  {s.premium ? " · PREMIUM" : ""}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 font-mono text-xs bg-foreground/10 text-foreground/60">
                  {statusLabel(s.status)}
                </span>
                {s.status !== "published" && (
                  <button
                    onClick={() => startTransition(() => setSignalStatus(s.id, "published"))}
                    disabled={publishing}
                    className="px-3 py-1.5 rounded-lg bg-positive/15 text-positive font-mono text-xs hover:bg-positive/25 transition-all disabled:opacity-50"
                  >
                    Publish
                  </button>
                )}
                {s.status === "published" && (
                  <button
                    onClick={() => startTransition(() => setSignalStatus(s.id, "draft"))}
                    disabled={publishing}
                    className="px-3 py-1.5 rounded-lg bg-foreground/10 text-foreground/70 font-mono text-xs hover:bg-foreground/20 transition-all disabled:opacity-50"
                  >
                    Unpublish
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {signals.length === 0 && (
          <p className="font-body text-sm text-foreground/40 py-6 text-center">No signals yet.</p>
        )}
      </div>
    </div>
  );
}
