import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/css/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#ffffff",
            backgroundColor: "#000000",
            a: { color: "#d900ff" }, 
            h1: { color: "#ffffff" },
            h2: { color: "#ffffff" },
            h3: { color: "#ffffff" },
            p: { color: "#ffffff" },
            li: { color: "#ffffff" },
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
        JetBrains: ['JetBrains', 'sans-serif'],
        CutiveMono: ['CutiveMono', 'sans-serif'],
      },
      animation: {
        'pulse2': 'pulse2 1s ease-in-out infinite',
        'fade-in': 'fadeIn 1s linear',
        'fade-out': 'fadeOut 1s linear',
        'slow-fade-in': 'fadeIn 1s linear',
        'fast-fade-in': 'fadeIn .5s linear',
        'fast-fade-out': 'fadeOut .5s linear',
        'transformY-100': 'transformY100 800ms cubic-bezier(1, 0.4, 0.4, 0.5)',
        'transformY--100': 'transformY0100 800ms cubic-bezier(1, 0.4, 0.4, 0.5)',
        'transformYfull--100': 'transformYfull0100 800ms cubic-bezier(1, 0.4, 0.4, 0.5)',
        'transformX--100': 'transformX0100 800ms cubic-bezier(1, 0.4, 0.4, 0.5)',
        'transformX-100': 'transformX100 800ms cubic-bezier(1, 0.4, 0.4, 0.5)',
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
          '100%': {transform: 'translateY(0)', opacity: '1'},
        },
        transformYfull0100: {
          '0%': {transform: 'translateY(-100px)'},
          '100%': {transform: 'translateY(0)'},
        },
        transformX0100: {
          '0%': {transform: 'translateX(-100px)', opacity: '0'},
          '20%': {opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'},
        },
        transformX100: {
          '0%': {transform: 'translateX(+100px)', opacity: '0'},
          '20%': {opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'},
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
