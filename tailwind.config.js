/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brazil: '#009C3B',
        capeverde: '#003893',
        portugal: '#006600',
        cplp: '#1a3a5c',
        'cplp-light': '#2d6ea6',
        'cplp-dark': '#0f2236',
      },
    },
  },
  plugins: [],
}

