/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'line-green': '#00B900',
        'line-bg': '#7494C0',
        'line-bubble': '#85E249',
      }
    },
  },
  plugins: [],
}

