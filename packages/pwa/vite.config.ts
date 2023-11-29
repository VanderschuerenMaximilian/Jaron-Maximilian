// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath } from 'url'
import { url } from 'inspector'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    VitePWA({
      manifest: {
        name: 'Bellewaerde',
        short_name: 'Bellewaerde',
        icons: [
          {
            src: './icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: new RegExp(
              '^https://fonts.(?:googleapis|gstatic).com/(.*)',
            ),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 350,
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
              },
            },
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ["./src/composables/useFirebase.ts"],
    },
  },
})

