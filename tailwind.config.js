/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenTitle: '#496626',
        blueLight: '#00A3FF',
        greenVE: {
          '50': '#f9fde8',
          '100': '#f0f9ce',
          '200': '#e1f3a3',
          '300': '#cce96d',
          '400': '#b4db40',
          '500': '#96c121',
          '600': '#749a16',
          '700': '#587516',
          '800': '#475d17',
          '900': '#3d4f18',
          '950': '#1f2c07',
        },
        nacionalesColor: '#96C121',
        internacionalesColor: '#E8830D',
        gangaColor: '#F0AD4E',
        escapateColor: '#990A0A',
        remateColor:'#00A0E0',
        especialesColor:'#9DA326',
        feriadosColor:'#E9139B',
        businessColor:'#7D7D7D',
        footerColor:'#f2f2f2',
        footerTextColor: '#636363'
      },
      fontSize: {
        'xxs': '0.5rem', 
      },
      margin: {
        '100': '27rem', // Define una clase para un margen superior de 20px
      },
      height:{
        'gallery':'25.9rem',
      }
    },
  },
  plugins: [],
}
