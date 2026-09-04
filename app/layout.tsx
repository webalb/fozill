import type { Metadata } from "next";
import { Manrope, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PageViewTracker } from "@/components/tracking/page-view-tracker";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${manrope.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("fozill-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.classList.add("theme-transition");setTimeout(function(){document.documentElement.classList.remove("theme-transition");},400);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background text-foreground font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <PageViewTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
