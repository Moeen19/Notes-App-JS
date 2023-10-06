/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Project/*.{html,js}"],
  theme: {
    screens: {
      'sm': '100px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lm': '991px',
      'lg': '1100px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1180px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {},
  },
  plugins: [],
}

