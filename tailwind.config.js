/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        brand: ["'Almarena Mono Display'", 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#06b6d4',
          secondary: '#14b8a6',
          accent: '#67e8f9',
          neutral: '#4b5563',
          'base-100': '#111827',
          info: '#2fd7ff',
          success: '#a3e635',
          warning: '#fb923c',
          error: '#ef4444',
        },
      },
    ],
  },
};
