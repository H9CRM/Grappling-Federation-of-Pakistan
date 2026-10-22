import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { deploymentConfig } from './deployment.config.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { base, siteUrl } = deploymentConfig({ ...loadEnv(mode, process.cwd(), ''), ...process.env })
  return {
    base,
    define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
