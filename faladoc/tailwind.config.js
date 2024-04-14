/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'invalid': '#F17777',
        background: '#D0EFF0',
        timer: '#12ADB4'
      }
    },
  },
  plugins: [],
}

