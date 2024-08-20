import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";


import vercelServerless from "@astrojs/vercel/serverless";

// https://astro.build/config aaa
export default defineConfig({
  integrations: [tailwind()],
  server: {
    port: 4321, // Puerto en el que correrá Astro
  },
  build: {
    outDir: 'dist',
  },
  output: 'server',
  adapter: vercelServerless()
});