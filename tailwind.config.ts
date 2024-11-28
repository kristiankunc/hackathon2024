import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/svelte-ux/**/*.{svelte,js}',
    './node_modules/layerchart/**/*.{svelte,js}'
  ],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: '#030508',
          50: '#070c12',
          100: '#0e1725',
          200: '#1c2e4a',
          300: '#2a466f',
          400: '#385d94',
          500: '#4674b9',
          600: '#6b90c7',
          700: '#90acd5',
          800: '#b5c7e3',
          900: '#dae3f1',
          950: '#edf1f8'
        },
        background: {
          DEFAULT: '#f9fafc',
          50: '#090b11',
          100: '#111722',
          200: '#222d44',
          300: '#334466',
          400: '#445b88',
          500: '#5571aa',
          600: '#778ebb',
          700: '#99aacc',
          800: '#bbc6dd',
          900: '#dde3ee',
          950: '#eef1f6'
        },
        primary: {
          DEFAULT: '#5477b9',
          50: '#070b12',
          100: '#0f1624',
          200: '#1e2d48',
          300: '#2c436d',
          400: '#3b5991',
          500: '#4a6fb5',
          600: '#6e8cc4',
          700: '#92a9d3',
          800: '#b7c6e1',
          900: '#dbe2f0',
          950: '#edf1f8'
        },
        secondary: {
          DEFAULT: '#cf7d6d',
          50: '#130806',
          100: '#27110c',
          200: '#4d2219',
          300: '#743225',
          400: '#9a4332',
          500: '#c1543e',
          600: '#cd7665',
          700: '#da988b',
          800: '#e6bbb2',
          900: '#f3ddd8',
          950: '#f9eeec'
        },
        accent: {
          DEFAULT: '#cbaf7f',
          50: '#120e07',
          100: '#241c0f',
          200: '#48391e',
          300: '#6d552c',
          400: '#91713b',
          500: '#b58e4a',
          600: '#c4a46e',
          700: '#d3bb92',
          800: '#e1d2b7',
          900: '#f0e8db',
          950: '#f8f4ed'
        }
      }
    }
  }
};

export default config;
