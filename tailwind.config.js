/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f2',
          100: '#dcf0e1',
          200: '#b8e0c5',
          600: '#1f7a4d',
          700: '#186339',
          800: '#124b2b',
          900: '#0d3820',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
