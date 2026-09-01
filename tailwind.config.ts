import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#111315",
          dark: "#111315",
          light: "#F5F5F2",
        },
        surface: {
          dark: "#181B1E",
          elevated: "#202428",
          card: "#14171A",
        },
        border: {
          DEFAULT: "#2C3138",
          dark: "#2C3138",
          light: "#E4E4DC",
          gold: "rgba(216, 168, 62, 0.3)",
        },
        gold: {
          DEFAULT: "#D8A83E",
          hover: "#F3CB6C",
          muted: "rgba(216, 168, 62, 0.15)",
          glow: "rgba(216, 168, 62, 0.25)",
        },
        editorial: {
          paper: "#F5F5F2",
          ink: "#111315",
          muted: "#6B7280",
        },
        status: {
          positive: "#10B981",
          neutral: "#8E95A2",
          negative: "#EF4444",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Manrope", "sans-serif"],
        body: ["var(--font-body)", "Source Serif 4", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        ticker: "ticker 35s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
