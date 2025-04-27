/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // App directory (if using App Router)
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages directory (if using Pages Router)
    "./components/**/*.{js,ts,jsx,tsx}", // Components directory
  ],
  theme: {
    extend: {
      colors: {
        KebabGreen: "#0C6045",  //"#014421",
        KebabGold:  "#F7A890",//"#D39D55"
        KC_GREEN : "#006244",
        KC_PEACH : "#f9c89b",
        EggShell : "#FDF6EC",
        Sandy : "#ECD9B9",
        DeepSea : "#2C4C63",
      },
      fontFamily : {
        parkinsans : ['Parkinsans', 'sans-serif']
      },
      fontSize : {
        'md-lg': '1.075rem',
      }
    },
  },
  plugins: [],
};

