import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // или @vitejs/plugin-react-swc
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      // На всякий случай явно указываем путь к корневому React
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
})