module.exports = {
  mode: "jit",
  purge: ["src/**/*.{j,t}s*"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        'dark': {
          'primary' : '#3396d8',
          'primary-focus' : '#50A1D8',
          'primary-content' : '#ffffff',

          'secondary' : '#f000b8',
          'secondary-focus' : '#bd0091',
          'secondary-content' : '#ffffff',

          'accent' : '#37cdbe',
          'accent-focus' : '#2ba69a',
          'accent-content' : '#ffffff',

          'neutral' : '#2a2e37',
          'neutral-focus' : '#3396d8',
          'neutral-content' : '#ffffff',

          'base-100' : '#16181c',
          'base-200' : '#2a2e37',
          'base-300' : '#16181d',
          'base-content' : '#ebecf0',

          'info' : '#50A1D8',
          'success' : '#87cf3a',
          'warning' : '#e1d460',
          'error' : '#ff6b6b',

          '--rounded-box': '1rem',          
          '--rounded-btn': '0.5rem',        
          '--rounded-badge': '1.9rem',      

          '--animation-btn': '0.25s',       
          '--animation-input': '0.2s',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '0.5rem',      
          '--border-btn': '1px',            
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen-Sans',
          'Ubuntu',
          'Cantarell',
          'Helvetica Neue',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        ]
      },
      colors: {
        gray: {
          100: '#919296',
          200: '#86878B',
          300: '#7A7B7F',
          400: '#6D6E72',
          500: '#5E6064',
          600: '#4E5054',
          700: '#3C3E43',
          800: '#1E2026',
          900: '#16181c',
        },
        blue: {
          100: '#A4C1D6',
          200: '#93BEDB',
          300: '#88B7D7',
          400: '#81B5D7',
          500: '#7AB2D7',
          600: '#6CACD7',
          700: '#5EA7D8',
          800: '#50A1D8',
          900: '#3396d8',
        },
      },
    },
  },
};
