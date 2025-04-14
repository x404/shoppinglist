import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/shoppinglist/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@store': resolve(__dirname, 'src/store'),
      '@components': resolve(__dirname, 'src/components'),
      '@types': resolve(__dirname, 'src/types'),
      '@helpers': resolve(__dirname, 'src/helpers'),
      '@services': resolve(__dirname, 'src/services'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@icons': resolve(__dirname, 'src/components/Icons'),
    }
  }
})
