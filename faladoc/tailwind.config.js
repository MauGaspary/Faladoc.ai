/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      background: '#D0EFF0',
      timer: '#12ADB4',
      invalid: '#F17777',
    }
  },
  plugins: [],
}

