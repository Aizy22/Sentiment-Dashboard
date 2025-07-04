// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This correctly targets all your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}