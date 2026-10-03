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
        brand: {
          accent: "#4222DC",
          "accent-hover": "#3216b3",
          "accent-light": "#ECE8FD",
          navy: "#05052D",
          dark: "#202020",
          body: "#5F5F5F",
          muted: "#7A7A7A",
          surface: "#FBFBFB",
          "surface-alt": "#F6F6F6",
          border: "#E2E4E9",
          "border-dark": "#C9C9C9",
          whatsapp: "#25D366"
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      maxWidth: {
        boxed: "1140px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 30px rgba(66, 34, 220, 0.12)",
        button: "0 6px 18px rgba(66, 34, 220, 0.28)",
      },
      borderRadius: {
        element: "4px",
      },
    },
  },
  plugins: [],
};
