"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  X,
  Send,
  Mail,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldAlert,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  getBroadcastAudienceSummary,
  sendTestBroadcast,
  broadcastPulseToSubscribers,
  AudienceSummary,
} from "@/app/actions/broadcast";
import { renderPulseDigestHtml } from "@/lib/email/pulse-digest-template";

interface BroadcastModalProps {
  pulse: any;
  isOpen: boolean;
  onClose: () => void;
}

export function BroadcastModal({ pulse, isOpen, onClose }: BroadcastModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [audience, setAudience] = useState<AudienceSummary | null>(null);
  const [loadingAudience, setLoadingAudience] = useState(true);

  // Test send state
  const [testEmail, setTestEmail] = useState("");
  const [isTestPending, startTestTransition] = useTransition();
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Mass broadcast state
  const [confirmed, setConfirmed] = useState(false);
  const [isBroadcastPending, startBroadcastTransition] = useTransition();
  const [broadcastResult, setBroadcastResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoadingAudience(true);
      getBroadcastAudienceSummary()
        .then((data) => setAudience(data))
        .catch(() => setAudience(null))
        .finally(() => setLoadingAudience(false));
    }
  }, [isOpen]);

  if (!isOpen || !pulse) return null;

  const isPublished = pulse.status === "published";
  const previewHtml = renderPulseDigestHtml({
    pulse,
    recipientEmail: "subscriber@enterprise.com",
    isTest: false,
  });

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;
    setTestResult(null);
    startTestTransition(async () => {
      const res = await sendTestBroadcast(pulse.id, testEmail);
      setTestResult(res);
    });
  };

  const handleBroadcast = () => {
    if (!confirmed || !isPublished) return;
    setBroadcastResult(null);
    startBroadcastTransition(async () => {
      const res = await broadcastPulseToSubscribers(pulse.id);
      setBroadcastResult(res);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#0c0e10] border border-[#23272e] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#23272e] bg-[#121518] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-foreground tracking-tight">
                  Executive Broadcast Dispatcher
                </h3>
                <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider ${
                  isPublished ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  {pulse.status}
                </span>
              </div>
              <p className="font-mono text-xs text-foreground/50 truncate max-w-md">
                {pulse.title} ({pulse.slug})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport switcher */}
            <div className="hidden sm:flex items-center bg-[#161a1e] border border-[#23272e] rounded-lg p-1">
              <button
                onClick={() => setViewMode("desktop")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  viewMode === "desktop" ? "bg-gold text-background font-bold" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  viewMode === "mobile" ? "bg-gold text-background font-bold" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile (375px)
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-[#23272e] text-foreground/60 hover:text-foreground hover:bg-[#161a1e] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split view (Preview left, Dispatch controls right) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Live Email Preview (7 cols on lg) */}
          <div className="lg:col-span-7 h-full bg-[#08090a] border-r border-[#23272e] flex flex-col items-center justify-start p-4 sm:p-6 overflow-y-auto">
            <div className="w-full flex items-center justify-between mb-3 text-xs font-mono text-foreground/50">
              <span>LIVE INBOX PREVIEW</span>
              <span>Obsidian Executive Styling</span>
            </div>

            <div
              className={`w-full transition-all duration-300 rounded-xl overflow-hidden border border-[#23272e] bg-[#0c0e10] shadow-2xl ${
                viewMode === "mobile" ? "max-w-[390px]" : "max-w-[620px]"
              }`}
            >
              <iframe
                title="Email preview"
                srcDoc={previewHtml}
                className="w-full h-[620px] bg-[#0c0e10] border-0"
              />
            </div>
          </div>

          {/* Right Column: Audience & Dispatch Cockpit (5 cols on lg) */}
          <div className="lg:col-span-5 h-full bg-[#101316] p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            
            <div className="space-y-6">
              {/* Audience Statistics Card */}
              <div className="p-4 rounded-xl border border-[#23272e] bg-[#14181c] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Target Audience
                  </span>
                  {loadingAudience ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground/40" />
                  ) : (
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      {audience?.active ?? 0} ACTIVE
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#23272e]">
                  <div className="p-2 rounded bg-[#0c0e10] border border-[#23272e]/60">
                    <div className="font-mono text-[10px] text-foreground/40">Total</div>
                    <div className="font-heading font-bold text-sm text-foreground">{audience?.total ?? "—"}</div>
                  </div>
                  <div className="p-2 rounded bg-[#0c0e10] border border-[#23272e]/60">
                    <div className="font-mono text-[10px] text-foreground/40">Active</div>
                    <div className="font-heading font-bold text-sm text-emerald-400">{audience?.active ?? "—"}</div>
                  </div>
                  <div className="p-2 rounded bg-[#0c0e10] border border-[#23272e]/60">
                    <div className="font-mono text-[10px] text-foreground/40">Unsub</div>
                    <div className="font-heading font-bold text-sm text-foreground/50">{audience?.unsubscribed ?? "—"}</div>
                  </div>
                </div>
              </div>

              {/* Test Dispatch Form */}
              <div className="p-4 rounded-xl border border-[#23272e] bg-[#14181c] space-y-3">
                <div className="flex items-center gap-1.5 font-mono text-xs text-foreground/70 uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>Send Test Preview</span>
                </div>
                <p className="font-body text-xs text-foreground/50 leading-relaxed">
                  Send a single preview digest to your personal inbox to inspect formatting in your email client before broadcasting.
                </p>

                <form onSubmit={handleSendTest} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="analyst@fozill.com"
                      className="flex-1 px-3 py-2 rounded-lg bg-[#0c0e10] border border-[#23272e] text-xs font-mono text-foreground focus:outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      disabled={isTestPending || !testEmail}
                      className="px-3 py-2 rounded-lg bg-surface border border-[#23272e] hover:border-gold/50 text-foreground text-xs font-mono hover:text-gold transition-colors disabled:opacity-50 shrink-0"
                    >
                      {isTestPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Send Test"}
                    </button>
                  </div>

                  {testResult && (
                    <div className={`p-2.5 rounded-lg border text-xs font-mono flex items-start gap-2 ${
                      testResult.success
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-negative/10 border-negative/30 text-negative"
                    }`}>
                      {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                      <span>{testResult.message}</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Mass Broadcast Trigger & Safety Gate */}
              <div className="p-4 rounded-xl border border-[#23272e] bg-[#14181c] space-y-4">
                <div className="flex items-center gap-1.5 font-mono text-xs text-gold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Subscribers Mass Broadcast</span>
                </div>

                {!isPublished ? (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>This pulse issue is currently a DRAFT. You must change its status to PUBLISHED before broadcasting to subscribers.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-body text-xs text-foreground/60 leading-relaxed">
                      Dispatching will send this intelligence memorandum via Resend in batches to all <strong className="text-foreground">{audience?.active ?? 0} active subscribers</strong>.
                    </p>

                    <label className="flex items-start gap-2.5 p-3 rounded-lg border border-[#23272e] bg-[#0c0e10] cursor-pointer hover:border-gold/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className="mt-0.5 accent-gold"
                      />
                      <span className="font-body text-xs text-foreground/80 leading-snug">
                        I confirm that this intelligence issue has been reviewed and is ready for executive distribution.
                      </span>
                    </label>

                    <button
                      onClick={handleBroadcast}
                      disabled={!confirmed || isBroadcastPending}
                      className="w-full py-3 rounded-lg bg-gold text-background font-heading font-bold text-xs uppercase tracking-wider hover:bg-gold-hover transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isBroadcastPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Broadcast Batches…</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Authorize & Dispatch to {audience?.active ?? 0} Subscribers</span>
                        </>
                      )}
                    </button>

                    {broadcastResult && (
                      <div className={`p-3 rounded-lg border text-xs font-mono flex items-start gap-2 ${
                        broadcastResult.success
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-negative/10 border-negative/30 text-negative"
                      }`}>
                        {broadcastResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                        <span>{broadcastResult.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Dismiss */}
            <div className="pt-2 border-t border-[#23272e] flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#23272e] bg-surface text-xs font-mono text-foreground/60 hover:text-foreground transition-colors"
              >
                Close Console
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
