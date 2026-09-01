"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/subscribe-newsletter";

const initialState: NewsletterState = { message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  return (
    <form action={formAction} className="max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Your corporate email"
          className="flex-1 px-4 py-3 rounded-lg bg-[#111315] border border-[#2C3138] text-[#F5F5F2] placeholder:text-[#F5F5F2]/40 font-body text-sm focus:outline-none focus:border-[#D8A83E] focus:ring-1 focus:ring-[#D8A83E]/40"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D8A83E] text-[#111315] font-heading font-bold text-sm hover:bg-[#F3CB6C] transition-all disabled:opacity-50"
        >
          <span>{pending ? "Subscribing..." : "Subscribe"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p
        className={`mt-3 font-mono text-xs ${
          state.success ? "text-[#10B981]" : state.message ? "text-[#EF4444]" : "text-[#F5F5F2]/40"
        }`}
        role={state.message ? "status" : undefined}
      >
        {state.message || "Free every week. No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}