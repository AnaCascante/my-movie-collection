/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#425667', // Example color for primary
        secondary: '#dfe1df', // Example color for secondary
        tertiary: '#102d42', // Third color
        quaternary: '#136ab9', // Fourth color
        quinary: '#2f96ca', // Fifth color
      },
    },
  },
  plugins: [],
};
