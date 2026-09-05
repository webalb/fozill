"use client";

import { useState, useTransition } from "react";
import { updateBriefStatus, deleteBrief } from "@/app/actions/admin-ops";
import { Trash2, Edit2, Check, Phone, Mail, Building, MapPin } from "lucide-react";

export default function BriefManager({ briefs }: { briefs: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  const handleStatusChange = (id: string, newStatus: any) => {
    startTransition(async () => {
      await updateBriefStatus(id, newStatus);
    });
  };

  const handleSaveNotes = (id: string, currentStatus: any) => {
    startTransition(async () => {
      await updateBriefStatus(id, currentStatus, notesDraft);
      setEditingNotesId(null);
    });
  };

  const handleDelete = (id: string, clientName: string) => {
    if (confirm(`Are you sure you want to delete the brief request from "${clientName}"?`)) {
      startTransition(async () => {
        await deleteBrief(id);
      });
    }
  };

  return (
    <div className="space-y-4">
      {briefs.map((b: any) => (
        <div key={b.id} className="rounded-2xl border border-border bg-surface/60 p-5 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="font-heading font-bold text-lg tracking-tight text-foreground flex items-center gap-2">
                <span>{b.full_name || "Anonymous"}</span>
                <span className="text-foreground/40 font-normal text-sm">({b.organization})</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-foreground/50">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-gold" /> {b.work_email}
                </span>
                {b.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gold" /> {b.phone}
                  </span>
                )}
                <span className="text-foreground/30">·</span>
                <span>{new Date(b.created_at).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Status Selector */}
              <select
                value={b.status}
                disabled={isPending}
                onChange={(e) => handleStatusChange(b.id, e.target.value)}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold border cursor-pointer focus:outline-none transition-colors ${
                  b.status === "new"
                    ? "bg-gold/20 text-gold border-gold/40"
                    : b.status === "won"
                    ? "bg-positive/20 text-positive border-positive/40"
                    : b.status === "lost"
                    ? "bg-negative/20 text-negative border-negative/40"
                    : "bg-surface border-border text-foreground/80"
                }`}
              >
                <option value="new">Status: New</option>
                <option value="contacted">Status: Contacted</option>
                <option value="quoted">Status: Quoted</option>
                <option value="won">Status: Won (Retainer)</option>
                <option value="lost">Status: Lost</option>
              </select>

              <button
                onClick={() => handleDelete(b.id, b.full_name || b.organization)}
                disabled={isPending}
                className="p-1.5 rounded-lg border border-border bg-surface text-foreground/60 hover:text-negative hover:border-negative/40 transition-colors"
                title="Delete brief request"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[b.category, b.engagement_type, b.target_entity]
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-foreground/10 px-2.5 py-0.5 font-mono text-[11px] text-foreground/70 border border-border/50"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Notes section with inline edit */}
          <div className="rounded-xl bg-background/50 border border-border/60 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                Internal Notes &amp; Scope:
              </span>
              {editingNotesId !== b.id ? (
                <button
                  onClick={() => {
                    setEditingNotesId(b.id);
                    setNotesDraft(b.notes || "");
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-gold hover:text-gold-hover"
                >
                  <Edit2 className="w-2.5 h-2.5" /> Edit Notes
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingNotesId(null)}
                    className="font-mono text-[10px] text-foreground/50 hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveNotes(b.id, b.status)}
                    disabled={isPending}
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-positive font-bold"
                  >
                    <Check className="w-2.5 h-2.5" /> Save
                  </button>
                </div>
              )}
            </div>

            {editingNotesId === b.id ? (
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                rows={3}
                className="w-full mt-1 p-2 rounded-lg bg-surface border border-border text-foreground font-body text-xs focus:outline-none focus:border-gold"
                placeholder="Add analyst notes, quote details, NDA status..."
              />
            ) : (
              <p className="font-body text-xs text-foreground/80 whitespace-pre-wrap">
                {b.notes || <span className="text-foreground/40 italic">No notes recorded.</span>}
              </p>
            )}
          </div>
        </div>
      ))}

      {briefs.length === 0 && (
        <p className="font-body text-sm text-foreground/40 py-12 text-center card-panel bg-surface/40">
          No brief requests logged yet.
        </p>
      )}
    </div>
  );
}
