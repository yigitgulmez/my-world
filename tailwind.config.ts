import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx,css  }',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,css}',
    './src/css/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            backgroundColor: "#000000",
            a: { color: "#d900ff" }, 
          },
        },
      },
      gridTemplateColumns: {
        'custom': 'repeat(auto-fill, minmax(30rem, 1fr))',
      },
      screens: {
        'xs': '430px',
        'mdx': '950px',
        '4xl': '2560px',
      },
      fontFamily: {
        FiraCode: ['FiraCode', 'sans-serif'],
        CutiveMono: ['CutiveMono', 'sans-serif'],
      },
      animation: {
        'pulse2': 'pulse2 1s ease-in-out infinite',
        'fast-fade-in': 'fadeIn .5s linear',
        'fast-fade-out': 'fadeOut .5s linear',
        'transformY-100': 'transformY100 800ms cubic-bezier(1, 0.4, 0.4, 0.5)',
        'transformY--100': 'transformY0100 800ms cubic-bezier(1, 0.4, 0.4, 0.5)',
      },
      keyframes: {
        pulse2: {
          '0%, 100%': { transform: 'scale(1)'},
          '50%': { transform: 'scale(1.2)'},
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        transformY100: {
          '0%': {transform: 'translateY(100px)', opacity: '0'},
          '20%': {opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'},
        },
        transformY0100: {
          '0%': {transform: 'translateY(-100px)', opacity: '0'},
          '20%': {opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1', visibility: 'visible'},
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
