"use client";

import { useState, useActionState, useTransition } from "react";
import {
  createPulse,
  updatePulse,
  deletePulse,
  addPulseItem,
  updatePulseItem,
  deletePulseItem,
  setPulseStatus,
} from "@/app/actions/publish";
import { Edit2, Trash2, X, PlusCircle, ChevronDown, ChevronUp, Send } from "lucide-react";
import { BroadcastModal } from "./broadcast-modal";

export default function PulseManager({ pulses }: { pulses: any[] }) {
  const [createState, createAction, creating] = useActionState(createPulse, null);
  const [updateState, updatePulseAction, updating] = useActionState(updatePulse, null);
  const [itemState, itemAction, adding] = useActionState(addPulseItem, null);
  const [editItemState, editItemAction, editingItemPending] = useActionState(updatePulseItem, null);
  const [isPending, startTransition] = useTransition();

  const [editingPulse, setEditingPulse] = useState<any | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [expandedPulseId, setExpandedPulseId] = useState<string | null>(null);
  const [broadcastPulse, setBroadcastPulse] = useState<any | null>(null);

  const statusLabel = (s: string) =>
    s === "published" ? "Published" : s === "archived" ? "Archived" : "Draft";

  const handleDeletePulse = (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete pulse "${title}" and all its sub-items?`)) {
      startTransition(async () => {
        await deletePulse(id);
        if (editingPulse?.id === id) setEditingPulse(null);
      });
    }
  };

  const handleDeleteItem = (itemId: string, title: string) => {
    if (confirm(`Delete item "${title}"?`)) {
      startTransition(async () => {
        await deletePulseItem(itemId);
        if (editingItem?.id === itemId) setEditingItem(null);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Create / Edit Pulse Form */}
      <form
        key={editingPulse ? editingPulse.id : "new-pulse"}
        action={editingPulse ? updatePulseAction : createAction}
        className="rounded-2xl border border-border bg-surface/60 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-xs text-gold uppercase tracking-widest flex items-center gap-1.5">
            {editingPulse ? (
              <>
                <Edit2 className="w-3.5 h-3.5" />
                Edit Pulse · {editingPulse.title}
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5" />
                New Fozill Pulse · draft issue
              </>
            )}
          </h3>

          {editingPulse && (
            <button
              type="button"
              onClick={() => setEditingPulse(null)}
              className="inline-flex items-center gap-1 font-mono text-xs text-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" /> Cancel Edit
            </button>
          )}
        </div>

        {editingPulse && <input type="hidden" name="pulse_id" value={editingPulse.id} />}

        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Title
            </label>
            <input
              name="title"
              required
              defaultValue={editingPulse?.title || ""}
              placeholder="e.g. Week 36 – Consumer Price Sensitivity Surge"
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
              defaultValue={editingPulse?.summary || ""}
              placeholder="Executive digest summarizing the week's dominant shifts..."
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
              defaultValue={editingPulse?.mood_index ?? 50}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={creating || updating}
              className="px-4 py-2.5 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all disabled:opacity-50"
            >
              {creating || updating ? "Saving…" : editingPulse ? "Update pulse" : "Create draft"}
            </button>
            {editingPulse && (
              <button
                type="button"
                onClick={() => setEditingPulse(null)}
                className="px-4 py-2.5 rounded-lg border border-border text-foreground font-heading text-sm hover:bg-surface transition-colors"
              >
                Cancel
              </button>
            )}
            {(createState?.message || updateState?.message) && (
              <span className="font-mono text-xs text-foreground/60">
                {createState?.message || updateState?.message}
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Issues List */}
      <div className="space-y-6">
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest">
          All Issues ({pulses.length})
        </h3>
        {pulses.map((p) => {
          const isExpanded = expandedPulseId === p.id;
          return (
            <div key={p.id} className="rounded-2xl border border-border bg-surface/60 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-heading font-bold text-lg tracking-tight text-foreground">
                    {p.title}
                  </div>
                  <div className="font-mono text-[11px] text-foreground/60 mt-0.5">
                    Mood Index: <span className="text-gold font-bold">{p.mood_index}</span> · {p.pulse_items?.length ?? 0} sub-items
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full px-2 py-0.5 font-mono text-xs bg-foreground/10 text-foreground/60">
                    {statusLabel(p.status)}
                  </span>

                  {p.status !== "published" ? (
                    <button
                      onClick={() => startTransition(() => setPulseStatus(p.id, "published"))}
                      disabled={isPending}
                      className="px-3 py-1.5 rounded-lg bg-positive/15 text-positive font-mono text-xs hover:bg-positive/25 transition-all disabled:opacity-50"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => startTransition(() => setPulseStatus(p.id, "draft"))}
                      disabled={isPending}
                      className="px-3 py-1.5 rounded-lg bg-foreground/10 text-foreground/70 font-mono text-xs hover:bg-foreground/20 transition-all disabled:opacity-50"
                    >
                      Unpublish
                    </button>
                  )}

                  {p.status === "published" && (
                    <button
                      onClick={() => setBroadcastPulse(p)}
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/40 text-gold font-mono text-xs font-semibold hover:bg-gold hover:text-background transition-all shadow-[0_0_12px_rgba(216,168,62,0.15)]"
                      title="Preview and broadcast to subscribers"
                    >
                      <Send className="w-3 h-3" />
                      <span>Broadcast Issue</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setEditingPulse(p);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={isPending}
                    className="p-1.5 rounded-md border border-border bg-surface text-foreground/70 hover:text-gold hover:border-gold/40 transition-colors"
                    title="Edit pulse"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeletePulse(p.id, p.title)}
                    disabled={isPending}
                    className="p-1.5 rounded-md border border-border bg-surface text-foreground/70 hover:text-negative hover:border-negative/40 transition-colors"
                    title="Delete pulse"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setExpandedPulseId(isExpanded ? null : p.id)}
                    className="p-1.5 rounded-md border border-border bg-surface text-foreground/70 hover:text-foreground transition-colors"
                    title="Toggle items"
                  >
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <p className="font-body text-xs text-foreground/70">{p.summary}</p>

              {/* Pulse Items Section */}
              <div className="space-y-3 pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
                    Pulse Analyses / Sub-indicators
                  </span>
                </div>

                {!!p.pulse_items?.length && (
                  <ul className="space-y-2">
                    {p.pulse_items.map((it: any) => (
                      <li
                        key={it.id}
                        className={`rounded-xl border px-4 py-3 flex flex-wrap items-start justify-between gap-3 ${
                          editingItem?.id === it.id
                            ? "border-gold bg-gold/5"
                            : "border-border/60 bg-background/60"
                        }`}
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="font-heading font-semibold text-sm text-foreground flex items-center gap-2">
                            <span>{it.title}</span>
                            {it.premium && (
                              <span className="rounded-full px-1.5 py-0.2 font-mono text-[9px] bg-gold/20 text-gold font-bold">
                                PREMIUM
                              </span>
                            )}
                          </div>
                          <p className="font-body text-xs text-foreground/70">{it.body}</p>
                          {it.recommendation && (
                            <div className="font-body text-[11px] text-gold/80 pt-1">
                              <strong>Rec:</strong> {it.recommendation}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingItem(it)}
                            className="p-1 rounded border border-border bg-surface text-foreground/60 hover:text-gold hover:border-gold/30 transition-colors"
                            title="Edit item"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(it.id, it.title)}
                            className="p-1 rounded border border-border bg-surface text-foreground/60 hover:text-negative hover:border-negative/30 transition-colors"
                            title="Delete item"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Edit Pulse Item Form Modal / Inline */}
                {editingItem && editingItem.pulse_id === p.id && (
                  <form
                    action={editItemAction}
                    className="p-4 rounded-xl border border-gold/40 bg-elevated/70 space-y-3 mt-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gold uppercase tracking-wider flex items-center gap-1.5">
                        <Edit2 className="w-3 h-3" /> Edit Item · {editingItem.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="text-foreground/50 hover:text-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <input type="hidden" name="item_id" value={editingItem.id} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                          Title
                        </label>
                        <input
                          name="title"
                          required
                          defaultValue={editingItem.title}
                          className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                          Signal Trend (e.g. +14% / down)
                        </label>
                        <input
                          name="signal"
                          defaultValue={editingItem.signal || ""}
                          className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                        Body
                      </label>
                      <textarea
                        name="body"
                        required
                        rows={2}
                        defaultValue={editingItem.body}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                          Strategic Implication
                        </label>
                        <input
                          name="implication"
                          defaultValue={editingItem.implication || ""}
                          className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                          Recommended Action
                        </label>
                        <input
                          name="recommendation"
                          defaultValue={editingItem.recommendation || ""}
                          className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 font-body text-xs text-foreground/70">
                        <input
                          name="premium"
                          type="checkbox"
                          defaultChecked={editingItem.premium}
                          className="accent-gold"
                        />
                        Premium gated
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="px-3 py-1 rounded-md border border-border text-xs font-mono"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={editingItemPending}
                          className="px-3 py-1 rounded-md bg-gold text-background font-heading font-bold text-xs hover:bg-gold-hover transition-all"
                        >
                          {editingItemPending ? "Updating…" : "Save Item"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Add Pulse Item Form */}
                <form
                  action={itemAction}
                  className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border/40 pt-3"
                >
                  <input type="hidden" name="pulse_id" value={p.id} />
                  <div>
                    <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                      New Item Title
                    </label>
                    <input
                      name="title"
                      required
                      placeholder="e.g. Sachet downsizing backlash"
                      className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                      Signal metric
                    </label>
                    <input
                      name="signal"
                      placeholder="e.g. Price sensitivity ↑ 14%"
                      className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                      Body Analysis
                    </label>
                    <textarea
                      name="body"
                      required
                      rows={2}
                      placeholder="Analysis details..."
                      className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                      Implication (optional)
                    </label>
                    <input
                      name="implication"
                      placeholder="e.g. Consumer migration to secondary brands"
                      className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">
                      Prescription / Action (optional)
                    </label>
                    <input
                      name="recommendation"
                      placeholder="e.g. Offer bundled value packs"
                      className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 font-body text-xs text-foreground/70">
                      <input name="premium" type="checkbox" defaultChecked className="accent-gold" />
                      Premium item
                    </label>
                    <button
                      type="submit"
                      disabled={adding}
                      className="px-3 py-1.5 rounded-lg bg-gold text-background font-heading font-bold text-xs hover:bg-gold-hover transition-all disabled:opacity-50"
                    >
                      {adding ? "Adding…" : "+ Add item to pulse"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
        {pulses.length === 0 && (
          <p className="font-body text-sm text-foreground/40 py-6 text-center">No pulse issues yet.</p>
        )}
      </div>

      {/* Pillar 2: Broadcast Modal */}
      <BroadcastModal
        pulse={broadcastPulse}
        isOpen={Boolean(broadcastPulse)}
        onClose={() => setBroadcastPulse(null)}
      />
    </div>
  );
}
