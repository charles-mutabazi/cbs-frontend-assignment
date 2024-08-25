const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'vtd-primary': colors.blue, // Light mode Datepicker color
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

