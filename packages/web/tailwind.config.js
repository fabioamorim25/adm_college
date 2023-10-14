/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-bai-jamjuree)',
      }
    },
    colors: {
      // tons de cinza
      gray: {
        50: '#eaeaea',
        100: '#bebebf',
        200: '#9e9ea0',
        300: '#727275',
        400: '#56565a',
        500: '#2c2c31',
        600: '#28282d',
        700: '#1f1f23',
        800: '#18181b',
        900: '#121215',
      },
      // tons de roxo
      purple: {
        50: '#f3e9fc',
        100: '#e2c7f8',
        200: '#d0a5f4',
        300: '#be83f0',
        400: '#ac61ec',
        500: '#9a3fe8',
        600: '#7c32d4',
        700: '#5e25c0',
        800: '#4018ac',
        900: '#220b98',
      },
      // tons de verde
      green: {
        50: '#e6fbef',
        100: '#b1f1ce',
        200: '#8cebb6',
        300: '#57e295',
        400: '#36dc81',
        500: '#04d361',
        600: '#04c058',
        700: '#039645',
        800: '#027435',
        900: '#025929',
      },
      // tons de laranja
      orange: {
        50: '#fff4e6',
        100: '#ffe0b2',
        200: '#ffcc80',
        300: '#ffb74d',
        400: '#ffa726',
        500: '#ff9800',
        600: '#fb8c00',
        700: '#f57c00',
        800: '#ef6c00',
        900: '#e65100',
      },
      // tons de preto 
      black: {
        50: '#1a1a1a',
        100: '#141414',
        200: '#0e0e0e',
        300: '#080808',
        400: '#040404',
        500: '#000000',
      },
      // tons de branco
      white: {
        50: '#ffffff',
        100: 'f9fafb',
      },
      //tons de vermelho
      red: {
        50: '#ffe6e6',
        100: '#ffcccc',
        200: '#ff9999',
        300: '#ff6666',
        400: '#ff3333',
        500: '#ff0000',
        600: '#e60000',
        700: '#cc0000',
        800: '#b30000',
        900: '#990000',
      }
    },
    plugins: [],
  }
}
