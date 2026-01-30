import {heroui} from '@heroui/react';
import type {Config} from 'tailwindcss';

export default {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
  darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                'dark-gradient': 'linear-gradient(to top, rgba(0,0,0,0.8)), transparent'
            },
            screens: {
                'narrow-mobile-range': {'min': '320px', 'max': '414px'},
            },
          keyframes: {
            borderPulse: {
              "0%,100%": { opacity: "0.35" },
              "50%": { opacity: "1" },
            },
          },
          animation: {
            borderPulse: "borderPulse 2.5s ease-in-out infinite",
          },
        },
    },
    plugins: [heroui()],
} satisfies Config;
