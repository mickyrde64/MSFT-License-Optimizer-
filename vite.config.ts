import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  // Prioritize system environment variable (common in cloud/CI), then .env file
  const apiKey = process.env.API_KEY || env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Replaces process.env.API_KEY in client code with the string value
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});