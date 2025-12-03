/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        KebabGreen: "#0C6045",
        KebabGreenLight: "#178563",
        KebabGreenDark: "#084733",
        KebabGold: "#F7A890",
        KC_GREEN: "#006244",
        KC_PEACH: "#f9c89b",
        KC_Yellow: "#F4CF4B",
        Light_Peach: "#F4A88A",
        EggShell: "#FDF6EC",
        Sandy: "#ECD9B9",
        DeepSea: "#2C4C63",
        KC_RED: "#750F04",
        KC_Lemon: "#FFFD75",
      },
      fontFamily: {
        parkinsans: ["Parkinsans", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      fontSize: {
        "md-lg": "1.075rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
