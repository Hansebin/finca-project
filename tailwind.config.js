/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "re-color-001": "#F1F4FD",
        "re-color-002": "#7966E4",
        "re-color-003": "#36338C",
        "re-color-004": "#162A53",
        "white-color": "#fffff",
        "gray-001": "#E8E8E8",
        "gray-002": "#B1B8C7",
        "gray-003": "#B0B8CB",
        "bg-color": "#E3DEFE",
      },
    },
  },
  plugins: [daisyui],
};
