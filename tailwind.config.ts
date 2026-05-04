import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette extracted from the HAYIZ logo
        brand: {
          deep: "#1B0F4E",     // deep purple/indigo
          purple: "#3A1F8C",
          violet: "#5132B7",
          blue: "#2B5BD7",
          azure: "#1FA0CF",
          teal: "#3FD1C7",
          mint: "#7AE7C7",
        },
        // Ink scale flipped for light theme:
        // 950 = lightest page surface, 100 = deepest text.
        // Component classes like bg-ink-950 / text-ink-100 keep their semantics.
        ink: {
          950: "#FAFAFD",
          900: "#F3F2F8",
          800: "#E9E7F1",
          700: "#DAD7E6",
          600: "#C4C0D5",
          500: "#9C98B6",
          400: "#6E6A8C",
          300: "#4A4769",
          200: "#272548",
          100: "#11102A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #1B0F4E 0%, #3A1F8C 25%, #2B5BD7 60%, #3FD1C7 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(58,31,140,0.16), rgba(43,91,215,0.16) 50%, rgba(63,209,199,0.16))",
        "brand-radial":
          "radial-gradient(60% 60% at 50% 40%, rgba(81,50,183,0.18) 0%, rgba(31,160,207,0.10) 50%, rgba(250,250,253,0) 75%)",
        grid: "linear-gradient(rgba(17,16,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,16,42,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(63,209,199,0.30), 0 12px 40px -8px rgba(81,50,183,0.22)",
        "glow-lg":
          "0 0 0 1px rgba(63,209,199,0.35), 0 24px 80px -16px rgba(43,91,215,0.25)",
        soft: "0 8px 32px -12px rgba(17,16,42,0.18)",
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        "gradient-pan": "gradient-pan 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        "draw-line": "draw-line 1.6s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "draw-line": {
          to: { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
