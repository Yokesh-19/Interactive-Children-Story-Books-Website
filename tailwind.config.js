/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
            borderWidth: {
        3: '3px',
      },
      colors: {
        // Playful, kid-friendly palette
        primary: {
          50: '#f4f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#843dff', // main brand
          600: '#7916ff',
          700: '#6b04fd',
          800: '#5a03d5',
          900: '#4b05ad',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fff3c4',
          200: '#ffe888',
          300: '#ffd94d',
          400: '#ffc61a', // sunny yellow
          500: '#f5a900',
          600: '#d98200',
          700: '#b45c00',
          800: '#924900',
          900: '#783c00',
        },
        accent: {
          50: '#fff1f4',
          100: '#ffe0e8',
          200: '#ffc6d5',
          300: '#ff9db5',
          400: '#ff6490', // coral pink
          500: '#ff2d6f',
          600: '#f50a5a',
          700: '#cf004a',
          800: '#ac0344',
          900: '#93063f',
        },
        mint: {
          400: '#34e5c0',
          500: '#12d1a8',
        },
        ink: '#2d2154', // soft dark text (not harsh black)
        cloud: '#f7f5ff', // page background
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        body: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(132, 61, 255, 0.12)',
        card: '0 10px 40px rgba(45, 33, 84, 0.10)',
        pop: '0 6px 0 0 rgba(107, 4, 253, 0.35)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pop-in': 'pop-in 0.3s ease-out',
        wiggle: 'wiggle 0.4s ease-in-out',
      },
    },
  },
  safelist: [
    { pattern: /(bg|text)-(primary|secondary|accent|mint)-(100|600)/ },
  ],
  safelist: [
    { pattern: /(bg|text)-(primary|secondary|accent|mint)-(100|600)/ },
  ],
  plugins: [],
};