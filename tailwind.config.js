/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
const { addDynamicIconSelectors } = require('@iconify/tailwind')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Path to Tremor module    
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
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
        footerTextColor: '#636363',
        // light mode        
        tremor: {          
          brand: {            
            faint: colors.blue[50],            
            muted: colors.blue[200],            
            subtle: colors.blue[400],            
            DEFAULT: colors.blue[500],            
            emphasis: colors.blue[700],            
            inverted: colors.white,          
          },          
          background: {            
            muted: colors.gray[50],            
            subtle: colors.gray[100],            
            DEFAULT: colors.white,            
            emphasis: colors.gray[700],          
          },          
          border: {            
            DEFAULT: colors.gray[200],          
          },          
          ring: {            
            DEFAULT: colors.gray[200],          
          },          
          content: {            
            subtle: colors.gray[400],            
            DEFAULT: colors.gray[500],            
            emphasis: colors.gray[700],            
            strong: colors.gray[900],            
            inverted: colors.white,          
          },        
        },
      },
      fontSize: {
        'xxxs': '0.5rem', 
        'xxs': '0.6rem', 
        'tremor-label': ['0.75rem', { lineHeight: '1rem' }],        
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],        
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],        
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],   
      },
      margin: {
        '100': '27rem', // Define una clase para un margen superior de 20px
      },
      height:{
        'gallery':'25.9rem',
      },
      width:{
        '1.5/12':'calc(100% / 12 * 1.5)'
      },
      boxShadow: {        
        // light        
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',        
        'tremor-card':          
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',        
        'tremor-dropdown':          
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',            
      }
    },
  },
  safelist: [    
    {      
      pattern:        
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,      
      variants: ['hover', 'ui-selected'],    
    },    
    {      
      pattern:        
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,      
      variants: ['hover', 'ui-selected'],    
    },    
    {      
      pattern:        
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,      
      variants: ['hover', 'ui-selected'],    
    },    
    {      
      pattern:        
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,    
    },    
    {      
      pattern:        
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,    
    },    
    {      
      pattern:        
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,    
    },  
  ],
  plugins: [addDynamicIconSelectors(), require('@headlessui/tailwindcss')],
}
