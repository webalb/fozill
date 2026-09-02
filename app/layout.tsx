import type { Metadata } from "next";
import { Manrope, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
  title: "Fozill | Strategic Intelligence Platform for Nigeria",
  description:
    "We turn Nigeria's fragmented public information into strategic, high-stakes intelligence for business, political, and economic leaders.",
  keywords: [
    "Nigeria Business Intelligence",
    "SOCMINT Nigeria",
    "Market Research Nigeria",
    "Political Perception Intelligence",
    "Nigeria Consumer Pressure Index",
    "Brand Intelligence Lagos Abuja Kano",
  ],
  authors: [{ name: "Fozill Intelligence" }],
  openGraph: {
    title: "Fozill | Strategic Intelligence Platform for Nigeria",
    description:
      "Turning Nigeria's public signals, regional sentiment, and digital discourse into executive decisions.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
