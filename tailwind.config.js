/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // representative-color
        "color-001": "#F1F4FD",
        "color-002": "#7966E4",
        "color-003": "#36338C",
        "color-004": "#162A53",

        // gray-color
        "gray-001": "#E8E8E8",
        "gray-002": "#B1B8C7",
        "gray-003": "#B0B8CB",
        "gray-004": "#C5CAD5",

        // bg-color
        "bg-color": "#E3DEFE",

        // chart-color
        "chart-blue": "#3790F3",
        "chart-green": "#B4DD7F",
        "chart-red": "#EC5564",
        "chart-yellow": "#FFCA75",

        "white-color": "#fffff",
      },
      spacing: {
        1: "5px",
        2: "10px",
        3: "15px",
        4: "20px",
        5: "25px",
        6: "30px",
        7: "35px",
        8: "40px",
        9: "45px",
        10: "50px",
        11: "55px",
        12: "60px",
        13: "65px",
        14: "70px",
        15: "75px",
        16: "80px",
        17: "85px",
        18: "90px",
        19: "95px",
        20: "100px",
        21: "150px",
        22: "200px",
        23: "250px",
        24: "300px",
        25: "350px",
        30: "400px",
        31: "450px",
        32: "500px",
        // etc
        210: "210px",
        220: "220px",
        230: "230px",
        240: "240px",
      },
      zIndex: {
        100: "9999",
        90: "9998",
      },
    },
  },
  plugins: [daisyui],
};
