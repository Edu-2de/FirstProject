/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    // Se você quiser que o texto longo do markdown fique bonito (classe 'prose'),
    // precisaremos instalar o plugin typography depois. Por enquanto deixe vazio.
  ],
};
