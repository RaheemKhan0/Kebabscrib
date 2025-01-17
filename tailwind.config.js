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
<<<<<<< HEAD
        KebabGreen: "#0C6045",
        KebabGold: "#F7A890"
=======
        KebabGreen: "#0C6045",  //"#014421",
        KebabGold:  "#F7A890"//"#D39D55"
>>>>>>> 651dbabc9d63d463a14d26f2377d964e7fdc3d8c
      },
    },
  },
  plugins: [],
};

