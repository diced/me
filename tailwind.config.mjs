/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
        blue: {
					50: "#DEE4F2",
					100: "#CCD5EA",
					200: "#ACBBDD",
					300: "#889DCE",
					400: "#6782C1",
					500: "#4766AE",
					600: "#3A538D",
					700: "#2C406D",
					800: "#1E2A48",
					900: "#101728",
					950: "#090D16"
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
