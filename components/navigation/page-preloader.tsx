"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PreloaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    setLoading(true);
    setProgress(20);

    // Incrementally crawl progress up to 85% while waiting
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          return prev;
        }
        const diff = Math.random() * 12;
        return Math.min(prev + diff, 85);
      });
    }, 180);
  };

  const finishLoading = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);

    finishTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
  };

  // Route change complete
  useEffect(() => {
    finishLoading();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, [pathname, searchParams]);

  // Global click interceptor for local page links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Ignore right clicks or modified clicks
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore hash links, external links, mailto, tel, target="_blank", or download links
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      // Check origin
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;

        // Same URL, only hash changed
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }

        // Valid local route navigation -> start preloader immediately
        startLoading();
      } catch {
        // Ignore invalid URLs
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none"
      aria-hidden="true"
    >
      {/* Top glowing progress bar */}
      <div
        className="h-[3px] bg-gradient-to-r from-gold via-gold-hover to-gold transition-all duration-200 ease-out shadow-[0_0_14px_rgba(216,168,62,0.85)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: "width, opacity",
        }}
      />

      {/* Floating corner sync beacon */}
      <div
        className={`fixed top-4 right-4 z-[99999] pointer-events-none transition-opacity duration-200 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/95 border border-gold/40 shadow-2xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
          <span className="font-mono text-[10px] text-gold font-bold uppercase tracking-wider">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}

export function PagePreloader() {
  return (
    <Suspense fallback={null}>
      <PreloaderInner />
    </Suspense>
  );
}
