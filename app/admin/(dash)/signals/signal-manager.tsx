"use client";

import { useState, useActionState, useTransition } from "react";
import { upsertSignal, setSignalStatus, deleteSignal } from "@/app/actions/publish";
import { Edit2, Trash2, X, PlusCircle } from "lucide-react";

export default function SignalManager({ signals }: { signals: any[] }) {
  const [saveState, saveAction, saving] = useActionState(upsertSignal, null);
  const [isPending, startTransition] = useTransition();

  const [editingSignal, setEditingSignal] = useState<any | null>(null);

  const statusLabel = (s: string) =>
    s === "published" ? "Published" : s === "archived" ? "Archived" : "Draft";

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      startTransition(async () => {
        await deleteSignal(id);
        if (editingSignal?.id === id) {
          setEditingSignal(null);
        }
      });
    }
  };

  const handleEdit = (signal: any) => {
    setEditingSignal(signal);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Create / Edit Form */}
      <form
        key={editingSignal ? editingSignal.id : "new-signal"}
        action={saveAction}
        className="rounded-2xl border border-border bg-surface/60 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-xs text-gold uppercase tracking-widest flex items-center gap-1.5">
            {editingSignal ? (
              <>
                <Edit2 className="w-3.5 h-3.5" />
                Edit Signal · {editingSignal.title.slice(0, 30)}…
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5" />
                New Signal · draft
              </>
            )}
          </h3>

          {editingSignal && (
            <button
              type="button"
              onClick={() => setEditingSignal(null)}
              className="inline-flex items-center gap-1 font-mono text-xs text-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" /> Cancel Edit
            </button>
          )}
        </div>

        {editingSignal && <input type="hidden" name="id" value={editingSignal.id} />}

        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
              Title
            </label>
            <input
              name="title"
              required
              defaultValue={editingSignal?.title || ""}
              placeholder="e.g. Household Price Resistance in Northern Commercial Corridors"
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
                defaultValue={editingSignal?.category || "business"}
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
                defaultValue={editingSignal?.direction || "neutral"}
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
                defaultValue={editingSignal?.confidence ?? 50}
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
              defaultValue={editingSignal?.location || ""}
              placeholder="e.g. Lagos & South-East, North-West, Abuja FCT"
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
              defaultValue={editingSignal?.body || ""}
              placeholder="Describe the intelligence signal, evidence, and velocity..."
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <label className="flex items-center gap-2 font-body text-sm text-foreground/70">
            <input
              name="premium"
              type="checkbox"
              defaultChecked={editingSignal?.premium || false}
              className="accent-gold"
            />
            Premium (complete-report gated)
          </label>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2.5 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all disabled:opacity-50"
            >
              {saving ? "Saving…" : editingSignal ? "Update signal" : "Save draft"}
            </button>
            {editingSignal && (
              <button
                type="button"
                onClick={() => setEditingSignal(null)}
                className="px-4 py-2.5 rounded-lg border border-border text-foreground font-heading text-sm hover:bg-surface transition-colors"
              >
                Cancel
              </button>
            )}
            {saveState?.message && (
              <span className="font-mono text-xs text-foreground/60">{saveState.message}</span>
            )}
          </div>
        </div>
      </form>

      {/* Signals List */}
      <div className="space-y-3">
        <h3 className="font-mono text-xs text-foreground/50 uppercase tracking-widest">
          All signals ({signals.length})
        </h3>
        {signals.map((s) => (
          <div
            key={s.id}
            className={`rounded-2xl border p-4 transition-all ${
              editingSignal?.id === s.id
                ? "border-gold bg-gold/5"
                : "border-border bg-surface/60 hover:border-border/90"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1 max-w-2xl">
                <div className="font-heading font-bold text-base tracking-tight">{s.title}</div>
                <div className="font-mono text-[11px] text-foreground/60">
                  {s.category.toUpperCase()} · {s.direction} · {s.confidence}% conf
                  {s.location ? ` · ${s.location}` : ""}
                  {s.premium ? " · PREMIUM" : ""}
                </div>
                <p className="font-body text-xs text-foreground/75 line-clamp-2 mt-1">{s.body}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="rounded-full px-2 py-0.5 font-mono text-xs bg-foreground/10 text-foreground/60">
                  {statusLabel(s.status)}
                </span>

                {s.status !== "published" ? (
                  <button
                    onClick={() => startTransition(() => setSignalStatus(s.id, "published"))}
                    disabled={isPending}
                    className="px-2.5 py-1 rounded-md bg-positive/15 text-positive font-mono text-xs hover:bg-positive/25 transition-all disabled:opacity-50"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => startTransition(() => setSignalStatus(s.id, "draft"))}
                    disabled={isPending}
                    className="px-2.5 py-1 rounded-md bg-foreground/10 text-foreground/70 font-mono text-xs hover:bg-foreground/20 transition-all disabled:opacity-50"
                  >
                    Unpublish
                  </button>
                )}

                <button
                  onClick={() => handleEdit(s)}
                  disabled={isPending}
                  className="p-1.5 rounded-md border border-border bg-surface text-foreground/70 hover:text-gold hover:border-gold/40 transition-colors"
                  title="Edit signal"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(s.id, s.title)}
                  disabled={isPending}
                  className="p-1.5 rounded-md border border-border bg-surface text-foreground/70 hover:text-negative hover:border-negative/40 transition-colors"
                  title="Delete signal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
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
