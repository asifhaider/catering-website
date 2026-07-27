import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const branch = process.env.GITHUB_REF_NAME
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repository && branch ? `/${repository}/${branch}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
})
