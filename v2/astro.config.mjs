// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // O segredo está aqui: o tailwind() precisa estar nesta lista
  integrations: [tailwind()],
});
