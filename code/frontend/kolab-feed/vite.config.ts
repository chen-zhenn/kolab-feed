import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const baseUrl = `http://${env.VITE_APP_HOST}:${env.VITE_APP_PORT}`;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __VITE_API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
      __VITE_SUPABASE_URL__: JSON.stringify(env.VITE_SUPABASE_URL),
      __VITE_SUPABASE_KEY__: JSON.stringify(env.VITE_SUPABASE_KEY),
      __VITE_APP_BASE_URL__: JSON.stringify(baseUrl),
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 3000,
      host: env.VITE_APP_HOST || 'localhost',
    },
    build: {
      sourcemap: true,
      outDir: 'dist', 
      rollupOptions: {}
    }
  };
});
