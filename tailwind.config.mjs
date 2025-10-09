/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdoc,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      maxWidth: {
        '2000': '2000px'
      }
    },
  },
  plugins: [],
}
