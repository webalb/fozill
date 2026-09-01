"use client";

import { useState } from "react";
import { useActionState } from "react";
import { ArrowRight, ArrowLeft, Check, Lock } from "lucide-react";
import { submitBriefRequest, type BriefRequestState } from "@/app/actions/submit-brief-request";

const initialState: BriefRequestState = { message: "" };

const categories = [
  { value: "business_brand", label: "Business & Brand" },
  { value: "competitor_radar", label: "Competitor Surveillance" },
  { value: "political_identity", label: "Political / Public Figure" },
  { value: "economic_sector", label: "Economic / Sector Research" },
  { value: "crisis_emergency", label: "Crisis / Emergency Response" },
];

const engagements = [
  { value: "adhoc_report", label: "Emergency Ad-Hoc Report (48h)" },
  { value: "monthly_retainer", label: "Weekly Retainer" },
  { value: "custom_advisory", label: "Monthly Strategy Briefing" },
];

const steps = ["Intelligence Focus", "Target & Scope", "Engagement", "Contact"];

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [state, formAction, pending] = useActionState(submitBriefRequest, initialState);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <section className="relative overflow-hidden pt-20 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(216,168,62,0.07),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-4">
          <div className="font-mono text-xs text-[#D8A83E] uppercase tracking-widest">
            Confidential Desk
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight">
            Commission an Executive Brief
          </h1>
          <p className="font-body text-base text-[#F5F5F2]/75 leading-relaxed max-w-xl mx-auto">
            Tell us what you need to know. An intelligence analyst will scope the engagement and
            respond within 4 business hours. All inquiries are covered by NDA on request.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[10px] ${
                  idx === step
                    ? "border-[#D8A83E] bg-[#D8A83E]/10 text-[#D8A83E]"
                    : idx < step
                    ? "border-[#10B981]/50 bg-[#10B981]/10 text-[#10B981]"
                    : "border-[#2C3138] text-[#F5F5F2]/40"
                }`}
              >
                {idx < step && <Check className="w-3 h-3" />}
                <span>{label}</span>
              </div>
              {idx < steps.length - 1 && <span className="w-3 h-px bg-[#2C3138]" />}
            </div>
          ))}
        </div>

        <form
          action={formAction}
          className="rounded-2xl border border-[#2C3138] bg-[#181B1E]/90 backdrop-blur-md p-8 sm:p-10"
        >
          {/* STEP 0: Focus */}
          {step === 0 && (
            <div className="space-y-4">
              <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-1">
                What is your primary intelligence focus?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <label
                    key={c.value}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#2C3138] bg-[#202428]/80 cursor-pointer hover:border-[#D8A83E]/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={c.value}
                      required
                      className="accent-[#D8A83E]"
                    />
                    <span className="font-heading text-sm">{c.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Target */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-2">
                  Target entity, brand, or topic
                </label>
                <input
                  name="targetEntity"
                  required
                  placeholder="e.g. Tier-1 dairy brand, 2027 election campaign, affordable housing sector"
                  className="w-full px-4 py-3 rounded-lg bg-[#111315] border border-[#2C3138] text-[#F5F5F2] placeholder:text-[#F5F5F2]/40 font-body text-sm focus:outline-none focus:border-[#D8A83E]"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-2">
                  Additional context (optional)
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Competitors, geographies, urgency, anything the analyst should know…"
                  className="w-full px-4 py-3 rounded-lg bg-[#111315] border border-[#2C3138] text-[#F5F5F2] placeholder:text-[#F5F5F2]/40 font-body text-sm focus:outline-none focus:border-[#D8A83E]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Engagement */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-1">
                Urgency &amp; frequency
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                {engagements.map((e) => (
                  <label
                    key={e.value}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#2C3138] bg-[#202428]/80 cursor-pointer hover:border-[#D8A83E]/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="engagement"
                      value={e.value}
                      required
                      className="accent-[#D8A83E]"
                    />
                    <span className="font-heading text-sm">{e.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Contact */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-2">
                    Full name
                  </label>
                  <input
                    name="fullName"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#111315] border border-[#2C3138] text-[#F5F5F2] placeholder:text-[#F5F5F2]/40 font-body text-sm focus:outline-none focus:border-[#D8A83E]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-2">
                    Organization
                  </label>
                  <input
                    name="organization"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#111315] border border-[#2C3138] text-[#F5F5F2] placeholder:text-[#F5F5F2]/40 font-body text-sm focus:outline-none focus:border-[#D8A83E]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-2">
                    Corporate / official email
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#111315] border border-[#2C3138] text-[#F5F5F2] placeholder:text-[#F5F5F2]/40 font-body text-sm focus:outline-none focus:border-[#D8A83E]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#F5F5F2]/60 uppercase tracking-widest mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    name="phone"
                    required
                    placeholder="+234…"
                    className="w-full px-4 py-3 rounded-lg bg-[#111315] border border-[#2C3138] text-[#F5F5F2] placeholder:text-[#F5F5F2]/40 font-body text-sm focus:outline-none focus:border-[#D8A83E]"
                  />
                </div>
              </div>
              <p className="flex items-center gap-2 font-mono text-[11px] text-[#F5F5F2]/50">
                <Lock className="w-3.5 h-3.5 text-[#D8A83E]" />
                Handled under NDA. We never share your intelligence needs or identity.
              </p>
            </div>
          )}

          <div className="mt-8">
            <p
              className={`mb-4 font-mono text-xs ${
                state.success ? "text-[#10B981]" : state.message ? "text-[#EF4444]" : ""
              }`}
              role={state.message ? "status" : undefined}
            >
              {state.message}
            </p>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading text-sm text-[#F5F5F2]/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D8A83E] text-[#111315] font-heading font-bold text-sm hover:bg-[#F3CB6C] transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D8A83E] text-[#111315] font-heading font-bold text-sm hover:bg-[#F3CB6C] transition-all disabled:opacity-50"
                >
                  {pending ? "Submitting..." : "Submit Brief Request"} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}