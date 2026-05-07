import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const branch = process.env.GITHUB_REF_NAME
const base = branch ? `/claude-code/${branch}/` : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
