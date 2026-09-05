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
  const [formData, setFormData] = useState({
    category: "business_brand",
    targetEntity: "",
    notes: "",
    engagement: "adhoc_report",
    fullName: "",
    organization: "",
    workEmail: "",
    phone: "",
  });
  const [stepError, setStepError] = useState("");
  const [state, formAction, pending] = useActionState(submitBriefRequest, initialState);

  const next = () => {
    setStepError("");
    if (step === 0 && !formData.category) {
      setStepError("Please select a primary intelligence focus.");
      return;
    }
    if (step === 1 && formData.targetEntity.trim().length < 2) {
      setStepError("Please specify your target entity, brand, or topic (minimum 2 characters).");
      return;
    }
    if (step === 2 && !formData.engagement) {
      setStepError("Please select an engagement model.");
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setStepError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--gold)_/_0.07),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-4">
          <div className="font-mono text-xs text-gold uppercase tracking-widest">
            Confidential Desk
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight">
            Commission an Executive Brief
          </h1>
          <p className="font-body text-base text-foreground/75 leading-relaxed max-w-xl mx-auto">
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
                    ? "border-gold bg-gold/10 text-gold"
                    : idx < step
                    ? "border-positive/50 bg-positive/10 text-positive"
                    : "border-border text-foreground/40"
                }`}
              >
                {idx < step && <Check className="w-3 h-3" />}
                <span>{label}</span>
              </div>
              {idx < steps.length - 1 && <span className="w-3 h-px bg-border" />}
            </div>
          ))}
        </div>

        <form
          action={formAction}
          className="rounded-2xl border border-border bg-surface/90 backdrop-blur-md p-8 sm:p-10"
        >
          {/* Persistent Hidden Inputs for Multi-Step Submission */}
          <input type="hidden" name="category" value={formData.category} />
          <input type="hidden" name="targetEntity" value={formData.targetEntity} />
          <input type="hidden" name="notes" value={formData.notes} />
          <input type="hidden" name="engagement" value={formData.engagement} />

          {/* STEP 0: Focus */}
          {step === 0 && (
            <div className="space-y-4">
              <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
                What is your primary intelligence focus?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <label
                    key={c.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.category === c.value
                        ? "border-gold bg-gold/10"
                        : "border-border bg-elevated/80 hover:border-gold/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="_step0_category"
                      value={c.value}
                      checked={formData.category === c.value}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, category: e.target.value }));
                        setStepError("");
                      }}
                      className="accent-gold"
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
                <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-2">
                  Target entity, brand, or topic
                </label>
                <input
                  value={formData.targetEntity}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, targetEntity: e.target.value }));
                    setStepError("");
                  }}
                  required
                  placeholder="e.g. Tier-1 dairy brand, 2027 election campaign, affordable housing sector"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 font-body text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-2">
                  Additional context (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                  placeholder="Competitors, geographies, urgency, anything the analyst should know…"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 font-body text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Engagement */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-1">
                Urgency &amp; frequency
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                {engagements.map((e) => (
                  <label
                    key={e.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.engagement === e.value
                        ? "border-gold bg-gold/10"
                        : "border-border bg-elevated/80 hover:border-gold/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="_step2_engagement"
                      value={e.value}
                      checked={formData.engagement === e.value}
                      onChange={(ev) => {
                        setFormData((prev) => ({ ...prev, engagement: ev.target.value }));
                        setStepError("");
                      }}
                      className="accent-gold"
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
                  <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-2">
                    Full name
                  </label>
                  <input
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 font-body text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-2">
                    Organization
                  </label>
                  <input
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 font-body text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-2">
                    Corporate / official email
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    required
                    value={formData.workEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, workEmail: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 font-body text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    name="phone"
                    required
                    placeholder="+234…"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 font-body text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <p className="flex items-center gap-2 font-mono text-[11px] text-foreground/50">
                <Lock className="w-3.5 h-3.5 text-gold" />
                Handled under NDA. We never share your intelligence needs or identity.
              </p>
            </div>
          )}

          <div className="mt-8">
            {stepError && (
              <p className="mb-4 font-mono text-xs text-negative" role="alert">
                {stepError}
              </p>
            )}
            <p
              className={`mb-4 font-mono text-xs ${
                state.success ? "text-positive" : state.message ? "text-negative" : ""
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading text-sm text-foreground/70 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all disabled:opacity-50"
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