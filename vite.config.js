import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Cloudflare's Rocket Loader rewrites module scripts on novicelab.org and breaks the
// app, so mark the built entry script as off limits to it.
function skipRocketLoader() {
  return {
    name: 'skip-rocket-loader',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html.replace(/<script type="module" crossorigin /g, '<script type="module" crossorigin data-cfasync="false" '),
    },
  }
}

// The site is published on GitHub Pages at https://novicelab.org/pinewood-derby/,
// so production asset URLs must be prefixed while dev keeps serving from the root.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/pinewood-derby/' : '/',
  plugins: [react(), tailwindcss(), skipRocketLoader()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
}))
