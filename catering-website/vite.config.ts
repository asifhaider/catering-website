import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const branch = process.env.GITHUB_REF_NAME
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repository && branch ? `/${repository}/${branch}/` : '/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  server: {
    port: 5180,
    strictPort: false,
    host: true,
    open: true,
  },
})
