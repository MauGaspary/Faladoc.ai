/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        invalid: '#F17777',
        background: '#D0EFF0',
        timer: '#12ADB4',
        lightGreen: '#069696',
        gray: '#808080',
        link: '#3B29FF',
        subtitle: '#505050',
      }
    },
  },
  plugins: [],
}

