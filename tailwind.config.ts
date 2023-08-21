import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
          50: "#737373",
          100: "#6C6C6C",
          200: "#606060",
          300: "#535353",
          400: "#464646",
          500: "#393939",
          600: "#2D2D2D",
          700: "#202020",
          800: "#131313",
          900: "#060606",
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
};

export default config;
