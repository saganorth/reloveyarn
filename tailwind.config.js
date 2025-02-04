/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
theme: {
  extend: {  
    fontFamily: {
      'comic': ['"Comic Neue"', 'cursive'], typewriter: ['"Veteran Typewriter"', 'monospace'],
    },
    colors: {
      lightpurple: '#E9D8FD', 
    },
    }
  },
    plugins: [
    plugin(function ({ matchUtilities, theme }) {
        matchUtilities(
            {
                'font-stroke': (value) => ({
                    '-webkit-text-stroke-width': value
                })
            },
            {
                values: {
                    ...theme('borderWidth'),
                    thin: 'thin',
                    medium: 'medium',
                    thick: 'thick'
                }
            }
        );
    }),
    plugin(function ({ matchUtilities, theme }) {
        matchUtilities(
            {
                'font-stroke': (value) => ({
                    '-webkit-text-stroke-color': value
                })
            },
            {
                values: flattenColorPalette(theme('colors'))
            }
        );
    })
]
}

