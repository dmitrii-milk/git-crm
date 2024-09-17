import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 4010,
    hmr: {
      port: 5284,
      clientPort: 5284,
    },
  },
});
