"use client";

import { useActionState, useTransition } from "react";
import { createPulse, addPulseItem, setPulseStatus } from "@/app/actions/publish";

export default function PulseManager({ pulses }: { pulses: any[] }) {
  const [createState, createAction, creating] = useActionState(createPulse, null);
  const [itemState, itemAction, adding] = useActionState(addPulseItem, null);
  const [publishing, startTransition] = useTransition();

  const statusLabel = (s: string) =>
    s === "published" ? "Published" : s === "archived" ? "Archived" : "Draft";

  return (
    <div className="space-y-8">
      <form action={createAction} className="rounded-2xl border border-border bg-surface/60 p-5">
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-4">
          New Fozill Pulse · draft issue
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Title
            </label>
            <input
              name="title"
              required
              placeholder="Week 36 – Market Mood"
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Summary
            </label>
            <textarea
              name="summary"
              required
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Mood Index (0–100)
            </label>
            <input
              name="mood_index"
              type="number"
              min={0}
              max={100}
              defaultValue={50}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2.5 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all disabled:opacity-50"
            >
              {creating ? "Creating…" : "Create draft"}
            </button>
            {createState?.message && (
              <span className="font-mono text-xs text-foreground/60">{createState.message}</span>
            )}
          </div>
        </div>
      </form>

      <div className="space-y-6">
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest">Issues</h3>
        {pulses.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-surface/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-heading font-bold tracking-tight">{p.title}</div>
                <div className="font-mono text-[11px] text-foreground/60 mt-0.5">
                  Mood {p.mood_index} · {p.pulse_items?.length ?? 0} items
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 font-mono text-xs bg-foreground/10 text-foreground/60">
                  {statusLabel(p.status)}
                </span>
                {p.status !== "published" ? (
                  <button
                    onClick={() => startTransition(() => setPulseStatus(p.id, "published"))}
                    disabled={publishing}
                    className="px-3 py-1.5 rounded-lg bg-positive/15 text-positive font-mono text-xs hover:bg-positive/25 transition-all disabled:opacity-50"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => startTransition(() => setPulseStatus(p.id, "draft"))}
                    disabled={publishing}
                    className="px-3 py-1.5 rounded-lg bg-foreground/10 text-foreground/70 font-mono text-xs hover:bg-foreground/20 transition-all disabled:opacity-50"
                  >
                    Unpublish
                  </button>
                )}
              </div>
            </div>

            {!!p.pulse_items?.length && (
              <ul className="mt-3 space-y-2">
                {p.pulse_items.map((it: any) => (
                  <li key={it.id} className="rounded-lg bg-background/60 border border-border/60 px-3 py-2">
                    <span className="font-body text-sm text-foreground/90">{it.title}</span>
                    {it.premium && (
                      <span className="ml-2 rounded-full px-1.5 py-0.5 font-mono text-[10px] bg-gold/20 text-gold">
                        PREMIUM
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <form action={itemAction} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border pt-4">
              <input type="hidden" name="pulse_id" value={p.id} />
              <div>
                <label className="block font-mono text-xs text-foreground/50 uppercase tracking-widest mb-1">
                  Item title
                </label>
                <input
                  name="title"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-foreground/50 uppercase tracking-widest mb-1">
                  Body
                </label>
                <input
                  name="body"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-foreground/50 uppercase tracking-widest mb-1">
                  Signal <span className="text-foreground/30">(optional)</span>
                </label>
                <input
                  name="signal"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-foreground/50 uppercase tracking-widest mb-1">
                  Recommendation <span className="text-foreground/30">(optional)</span>
                </label>
                <input
                  name="recommendation"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground/70">
                <input name="premium" type="checkbox" className="accent-gold" />
                Premium item
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={adding}
                  className="px-3 py-2 rounded-lg bg-foreground/10 text-foreground font-mono text-xs hover:bg-foreground/20 transition-all disabled:opacity-50"
                >
                  {adding ? "Adding…" : "Add item"}
                </button>
                {itemState?.message && (
                  <span className="font-mono text-[11px] text-foreground/50">{itemState.message}</span>
                )}
              </div>
            </form>
          </div>
        ))}
        {pulses.length === 0 && (
          <p className="font-body text-sm text-foreground/40 py-6 text-center">No pulses yet.</p>
        )}
      </div>
    </div>
  );
}
