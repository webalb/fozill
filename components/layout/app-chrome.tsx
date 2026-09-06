"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { PageViewTracker } from "@/components/tracking/page-view-tracker";

/**
 * AppChrome controls the presentation layer around routes.
 * When inside the Admin console (/admin or /admin/*), it completely removes
 * the consumer/marketing Navbar and Footer, giving the Admin dashboard
 * 100% full-screen, full-scale dedicated workspace real estate.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <PageViewTracker />
    </>
  );
}
