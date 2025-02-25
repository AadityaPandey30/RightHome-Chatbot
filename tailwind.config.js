/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        expanding: {
            "0%": { transform: "scaleX(0)", opacity: "0" },
            "100%": { transform: "scaleX(1)", opacity: "100%" },
        },
        moving: {
            "0%": { backgroundPosition: "0 0" },
            "100%": { backgroundPosition: "-200% 0" },
        },
    },
    animation: {
        loading: "expanding 0.4s 0.7s forwards linear, moving 1s 1s infinite forwards linear",
    },
    },
  },
  plugins: [],
};
