import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ← ITO ANG CRUCIAL PARA SA ELECTRON
})
