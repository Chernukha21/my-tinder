import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
<<<<<<< HEAD
    extend: {
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      }
    },
=======
    extend: {},
>>>>>>> 50deb1af6e9ea6480a47b99c817a5c399138bfb4
  },
  darkMode: "class",
  plugins: [heroui()]
} satisfies Config;
