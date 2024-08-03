import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/components/scripts/GeminiTranslate.js' + './src/components/scripts/GeminiImage.js', 
      output: {
        format: 'es'
      }
    }
  }
});