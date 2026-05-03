import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#fdf9ec',
          100: '#faf0cc',
          200: '#f4de95',
          300: '#ecc94b',
          400: '#e6b820',
          500: '#c9a84c',
          600: '#a07c2d',
          700: '#7d5c1e',
          800: '#5c4117',
          900: '#3d2b0f',
        },
        dark: {
          50: '#f6f5f8',
          100: '#e9e7f0',
          200: '#d3d0e2',
          300: '#b0abc9',
          400: '#8880aa',
          500: '#6b6490',
          600: '#574f78',
          700: '#463f62',
          800: '#3b3553',
          900: '#1a1625',
          950: '#0d0b14',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
