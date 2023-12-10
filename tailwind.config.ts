import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#FEFCFA",
        "card-color": "#FBF7EF",
        "faded-text": "#5A5A61",
        "border-color": "#E6E3D9",
        "footer-gray-light": "#3C414C",
        "footer-gray-dark": "#2C2F36",
      },
      width: {
        card: "293px",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      borderRadius: {
        custom: "5px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      body: ["Roboto"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
