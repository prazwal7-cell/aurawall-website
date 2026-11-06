import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative assets allow deployment at the root now and under
  // /products/aurawall/ in the future Cygnus Tech website.
  base: './',
})
