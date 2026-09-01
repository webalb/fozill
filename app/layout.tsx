import type { Metadata } from "next";
import { Manrope, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

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
      className={`${manrope.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#111315] text-[#F5F5F2] font-body antialiased selection:bg-[#D8A83E] selection:text-[#111315] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
