import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    dedupe: ['three'],
    extensions: ['.ts', '.js']
  }
})