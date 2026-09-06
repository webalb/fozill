"use client";

import React, { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/subscribe-newsletter";

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <UnsubscribeContent />
    </Suspense>
  );
}

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const success = searchParams.get("success") === "1";
  const error = searchParams.get("error");

  const [isPending, startTransition] = useTransition();
  const [resubscribed, setResubscribed] = useState(false);
  const [resubscribeMessage, setResubscribeMessage] = useState("");

  const handleResubscribe = () => {
    if (!email) return;
    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      const res = await subscribeNewsletter(null, formData);
      if (res.success) {
        setResubscribed(true);
        setResubscribeMessage(res.message);
      } else {
        setResubscribeMessage(res.message || "Failed to resubscribe.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl border border-panel-border bg-panel-strong p-8 shadow-2xl">
        {/* Header Logo */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-panel-border">
          <Image
            src="/logo-navbar.webp"
            alt="Fozill Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            unoptimized
          />
          <div>
            <div className="font-heading font-bold text-lg text-foreground tracking-wide">
              FOZILL<span className="text-gold">.</span>
            </div>
            <div className="font-mono text-[9px] tracking-widest text-gold uppercase -mt-0.5">
              Strategic Intelligence
            </div>
          </div>
        </div>

        {/* State 1: Resubscribed */}
        {resubscribed ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-heading font-semibold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>Subscription Re-activated</span>
            </div>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">
              Your email <strong className="text-foreground">{email}</strong> has been restored to the Fozill Global Intelligence Digest. You will receive the next scheduled weekly dispatch.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-background font-heading font-bold text-xs hover:bg-gold-hover transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Platform
              </Link>
            </div>
          </div>
        ) : success ? (
          /* State 2: Successfully Unsubscribed */
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-gold font-heading font-semibold text-base">
              <CheckCircle2 className="w-5 h-5 text-gold" />
              <span>Unsubscription Confirmed</span>
            </div>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">
              The corporate email address <strong className="text-foreground">{email}</strong> has been removed from our active dispatch registry.
            </p>
            <p className="font-body text-xs text-foreground/50 leading-relaxed">
              In accordance with NDPA & international data protection standards, your preference is immediately recorded and no further automated digests will be sent.
            </p>

            {email && (
              <div className="pt-4 border-t border-panel-border/80 flex flex-col gap-3">
                <p className="font-mono text-[11px] text-foreground/40">
                  Did you click this link accidentally?
                </p>
                <button
                  onClick={handleResubscribe}
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 font-heading font-semibold text-xs transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
                  {isPending ? "Re-activating…" : "Re-activate Subscription"}
                </button>
              </div>
            )}
          </div>
        ) : error ? (
          /* State 3: Error / Invalid Signature */
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-negative font-heading font-semibold text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Invalid Unsubscribe Link</span>
            </div>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">
              The cryptographic signature for this unsubscribe link was invalid or has expired.
            </p>
            <p className="font-body text-xs text-foreground/50">
              If you wish to manually remove your email, please reply directly to any digest or contact our intelligence desk at{" "}
              <a href="mailto:hello@fozill.com" className="text-gold underline">hello@fozill.com</a>.
            </p>
          </div>
        ) : (
          /* State 4: Direct landing without parameters */
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-base text-foreground">
              Manage Your Intelligence Digest Subscription
            </h2>
            <p className="font-body text-sm text-foreground/70">
              To unsubscribe from the Fozill Global Intelligence Digest, please use the unique link at the bottom of any email dispatch you have received.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono text-gold hover:underline"
              >
                ← Return to Fozill Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
