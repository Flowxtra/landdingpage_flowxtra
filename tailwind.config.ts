import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#003f4d", // Main primary color
          50: "#e6f2f5",
          100: "#cce5ea",
          200: "#99cbd5",
          300: "#66b1c0",
          400: "#3397ab",
          500: "#003f4d", // Main color
          600: "#003240",
          700: "#002630",
          800: "#001920",
          900: "#000d10",
        },
        secondary: {
          DEFAULT: "#006980", // Secondary color & Button hover
          light: "#00A8CD", // Light secondary
          hover: "#006980", // Hover state
        },
        footer: {
          bg: "#f4f6f8", // Footer background
        },
        button: {
          primary: "#003f4d", // Primary button color
          hover: "#00A8CD", // Button hover color
        },
      },
    },
  },
  plugins: [],
};

export default config;
