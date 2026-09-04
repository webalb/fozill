"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageVisit } from "@/app/actions/track";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastFired = useRef<string | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    if (pathname === lastFired.current) return;
    if (busy.current) return;
    lastFired.current = pathname;
    busy.current = true;

    const timer = setTimeout(async () => {
      try {
        await trackPageVisit(pathname);
      } finally {
        busy.current = false;
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
