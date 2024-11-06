import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Task_planner/'
    : '/',
  css: {
    extract: {
      filename: 'style.css',
      chunkFilename: 'style.css'
    }
  },
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: 'style.css'
      })
    ]
  }
})
