import lineClamp from "@tailwindcss/line-clamp"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors:{
          h: "#CA8E5D",
          border: "#ca8e5dab",
          bg: "#FFF3EA",
          body: "#B1A79F",
          hover: "#A26E44",
          input:"#674327",
      },
      fontFamily:{
        inter:["Inter", "sans-serif"],
        infant:["Cormorant Infant", "sans-serif"],
      },
    },
  },

  plugins: [
      lineClamp,
  ],
}