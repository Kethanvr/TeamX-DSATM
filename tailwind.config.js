/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)",
      },
      colors: {
        brand: {
          DEFAULT: "#22c55e",
          dark: "#15803d",
          light: "#86efac",
        },
      },
      boxShadow: {
        card: "0 12px 40px -24px rgba(34, 197, 94, 0.45)",
      },
    },
  },
  plugins: [],
};

