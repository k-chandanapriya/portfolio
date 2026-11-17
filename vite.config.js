import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://k-chandanapriya.github.io/portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
