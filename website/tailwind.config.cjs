const tailwindConfig = require('@theguild/tailwind-config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      colors: {
        ...tailwindConfig.theme.extend.colors,
        dark: '#0b0d11',
        gray: {
          100: '#f3f4f6',
          200: '#d0d3da',
          300: '#70788a',
          400: '#4e5665',
          500: '#394150',
          600: '#1c212c'
        },
        primary: '#1886ff'
      }
    }
  }
}
