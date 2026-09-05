"use client";

import { Suspense } from "react";
import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { requestOtp, verifyOtp } from "@/app/actions/admin-auth";

const initial: Awaited<ReturnType<typeof requestOtp>> = {};


export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const blocked = params.get("blocked") === "1";
  const invalidCode = params.get("error") === "invalid_code";

  const [step, setStep] = useState<"email" | "otp">("email");
  const [sentEmail, setSentEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [emailState, requestAction, requesting] = useActionState(requestOtp, initial);
  const [otpState, verifyAction, verifying] = useActionState(verifyOtp, initial);

  useEffect(() => {
    if (emailState.ok) {
      setStep("otp");
      setSentEmail(emailInput.trim().toLowerCase());
    }
  }, [emailState.ok, emailInput]);

  useEffect(() => {
    if (otpState.ok) {
      router.replace(otpState.next || "/admin");
      router.refresh();
    }
  }, [otpState.ok, otpState.next, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div className="font-mono text-xs text-gold uppercase tracking-widest mb-1">Fozill Ops</div>
          <h1 className="font-heading font-bold text-2xl tracking-tight">Admin Access</h1>
          <p className="font-body text-sm text-foreground/60 mt-1">
            Sign in with a one-time code sent to your inbox.
          </p>
        </div>

        {blocked && (
          <p className="mb-4 rounded-lg bg-negative/10 border border-negative/30 px-3 py-2 font-mono text-xs text-negative">
            Signed out: that account is not authorized for admin.
          </p>
        )}
        {invalidCode && (
          <p className="mb-4 rounded-lg bg-negative/10 border border-negative/30 px-3 py-2 font-mono text-xs text-negative">
            Invalid or expired sign-in link.
          </p>
        )}

        <div className="rounded-2xl border border-border bg-surface/80 p-8">
          {step === "email" && (
            <form action={requestAction}>
              <input type="hidden" name="next" value={next} />
              <label className="block font-mono text-xs text-foreground/60 uppercase tracking-widest mb-2">
                Admin email
              </label>
              <input
                type="email"
                name="email"
                required
                autoFocus
                defaultValue={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@fozill.com"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:border-gold mb-4"
              />

              {emailState.error && (
                <p className="mb-4 font-mono text-xs text-negative" role="status">
                  {emailState.error}
                </p>
              )}

              <button
                type="submit"
                disabled={requesting}
                className="w-full px-4 py-3 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all disabled:opacity-50"
              >
                {requesting ? "Sending code…" : "Send access code"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form action={verifyAction}>
              <input type="hidden" name="email" value={sentEmail} />
              <input type="hidden" name="next" value={next} />
              <p className="mb-4 font-body text-sm text-foreground/70">
                Enter the code sent to{" "}
                <span className="font-mono text-gold">{sentEmail}</span>.
              </p>
              <input
                type="text"
                name="otp"
                required
                autoFocus
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={8}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground font-body text-center text-xl tracking-[0.4em] focus:outline-none focus:border-gold mb-4"
              />

              {otpState.error && (
                <p className="mb-4 font-mono text-xs text-negative" role="status">
                  {otpState.error}
                </p>
              )}

              <button
                type="submit"
                disabled={verifying}
                className="w-full px-4 py-3 rounded-lg bg-gold text-background font-heading font-bold text-sm hover:bg-gold-hover transition-all disabled:opacity-50"
              >
                {verifying ? "Verifying…" : "Sign in"}
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="mt-3 w-full text-center font-mono text-xs text-foreground/50 hover:text-foreground transition-colors"
              >
                ← Use a different email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
