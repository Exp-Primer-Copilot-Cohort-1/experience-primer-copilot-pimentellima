import { config } from 'dotenv'
import path from 'path'
import { defineConfig } from 'vitest/config'

config()

export default defineConfig({
  root: path.resolve(__dirname, 'app'),
  test: {
    testTimeout: 5000000,
    deps: {
      inline: true,
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    },
  },
})
