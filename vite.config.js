import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore warnings about unresolved external modules
        if (warning.code === 'UNRESOLVED_IMPORT') {
          return
        }
        if (warning.code === 'THIS_IS_UNDEFINED') {
          return
        }
        warn(warning)
      },
    },
  },
})
