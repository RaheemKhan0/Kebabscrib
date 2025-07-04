/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App directory (if using App Router)
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages directory (if using Pages Router)
    "./components/**/*.{js,ts,jsx,tsx}", // Components directory
  ],
  theme: {
    extend: {
      colors: {
        KebabGreen: "#0C6045",
        KebabGreenLight: "#178563",
        KebabGreenDark: "#084733",
        KebabGold: "#F7A890", //"#D39D55"
        KC_GREEN: "#006244",
        KC_PEACH: "#f9c89b",
        KC_Yellow: "#F4CF4B",
        Light_Peach: "#F4A88A",
        EggShell: "#FDF6EC",
        Sandy: "#ECD9B9",
        DeepSea: "#2C4C63",
        KC_RED: "#750F04",
        KC_Lemon: "#FFFD75"
      },
      fontFamily: {
        parkinsans: ["Parkinsans", "sans-serif"],
        playfair: ["Playfair Display", "sans-serif"],
      },
      fontSize: {
        "md-lg": "1.075rem",
      },
    },
  },
  plugins: [],
};
