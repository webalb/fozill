import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PagePreloader } from "@/components/navigation/page-preloader";
import { AppChrome } from "@/components/layout/app-chrome";

export const metadata: Metadata = {
  title: "Fozill | Global Strategic Intelligence Platform",
  description:
    "We turn fragmented public information from markets worldwide into strategic, high-stakes intelligence for business, political, and economic leaders.",
  keywords: [
    "Global Business Intelligence",
    "SOCMINT Intelligence",
    "Market Research Africa",
    "Political Perception Intelligence",
    "Nigeria Consumer Pressure Index",
    "Emerging Market Intelligence",
  ],
  authors: [{ name: "Fozill Intelligence" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "manifest",
        url: "/manifest.webmanifest",
      },
    ],
  },
  openGraph: {
    title: "Fozill | Global Strategic Intelligence Platform",
    description:
      "Turning public signals, regional sentiment, and digital discourse from markets worldwide into executive decisions.",
    url: "https://fozill.com",
    siteName: "Fozill Intelligence",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("fozill-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.classList.add("theme-transition");setTimeout(function(){document.documentElement.classList.remove("theme-transition");},400);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background text-foreground font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <PagePreloader />
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
