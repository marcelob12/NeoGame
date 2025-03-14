import { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'first': '#233142',  // Color oscuro azul
        'second': '#455d7a', // Color azul grisáceo
        'third': '#f95959',  // Color rojo vibrante
        'fourth': '#e3e3e3', // Color gris claro
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        heading: ['Bebas Neue', 'cursive'],
        futuristic: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
