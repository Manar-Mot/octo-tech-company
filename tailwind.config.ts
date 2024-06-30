import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{tsx,css}"],
  theme: {
    extend: {
      colors: {
        backColor:"#f3f4f6",
        primary: "#F8F8FE",
        secondary: "#1F2F6A",
        accent: "#4C5DD3",
        title: "#000733",
        pargraph: "#707070",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
