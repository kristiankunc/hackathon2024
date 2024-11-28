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
          DEFAULT: '#03040a',
          50: '#060814',
          100: '#0c1027',
          200: '#17204f',
          300: '#233076',
          400: '#2f3f9d',
          500: '#3b4fc4',
          600: '#6272d0',
          700: '#8996dc',
          800: '#b0b9e8',
          900: '#d8dcf3',
          950: '#ebedf9'
        },
        background: {
          DEFAULT: '#f4f5fc',
          50: '#050714',
          100: '#0b0e28',
          200: '#161d50',
          300: '#212b78',
          400: '#2c39a0',
          500: '#3748c8',
          600: '#5f6cd3',
          700: '#8791de',
          800: '#afb6e9',
          900: '#d7daf4',
          950: '#ebedfa'
        },
        primary: {
          DEFAULT: '#435fcb',
          50: '#050814',
          100: '#0b1128',
          200: '#162250',
          300: '#213278',
          400: '#2c43a0',
          500: '#3754c8',
          600: '#5f76d3',
          700: '#8798de',
          800: '#afbbe9',
          900: '#d7ddf4',
          950: '#ebeefa'
        },
        secondary: {
          DEFAULT: '#ce8bdf',
          50: '#110514',
          100: '#220b28',
          200: '#441650',
          300: '#672178',
          400: '#892ca0',
          500: '#ab37c8',
          600: '#bc5fd3',
          700: '#cd87de',
          800: '#ddafe9',
          900: '#eed7f4',
          950: '#f7ebfa'
        },
        accent: {
          DEFAULT: '#d873d0',
          50: '#140613',
          100: '#280b25',
          200: '#50164b',
          300: '#772270',
          400: '#9f2d96',
          500: '#c738bb',
          600: '#d260c9',
          700: '#dd88d6',
          800: '#e9afe4',
          900: '#f4d7f1',
          950: '#f9ebf8'
        }
      }
    }
  }
};

export default config;
