import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  plugins: [
    react(),
    // Gzip compression for better performance
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli compression for modern browsers
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  
  // Build optimizations
  build: {
    // Enable source maps for debugging
    sourcemap: false,
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Enable minification
    minify: 'esbuild',
    
    // Target modern browsers for better optimization
    target: 'esnext',
  },
  
  // Development server optimizations
  server: {
    // Enable HMR for faster development
    hmr: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    // Pre-optimize dependencies and force re-optimization
    force: true,
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      'gsap',
    ],
  },
  
  // Environment variables
  define: {
    // Enable React DevTools in development
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
})
