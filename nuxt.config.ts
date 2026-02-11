// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-02-04',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap' }
      ],
      bodyAttrs: {
        class: 'bg-white text-slate-800 antialiased' // Default light background
      }
    }
  },
  tailwindcss: {
    config: {
      darkMode: 'class', // We will force dark mode mostly
      theme: {
        extend: {
          colors: {
            background: {
              DEFAULT: '#FFFFFF', // Pure White
              lighter: '#F8FAFC',  // Slate-50 for subtle contrast
              card: '#FFFFFF'
            },
            primary: {
              DEFAULT: '#DB2777', // The original Pink
              glow: '#FCE7F3',    // Very light pink for glows (changed for light mode)
              dim: '#BE185D'
            }
          },
          fontFamily: {
            display: ['Outfit', 'sans-serif'],
            body: ['Space Grotesk', 'sans-serif'],
            handwriting: ['Gloria Hallelujah', 'cursive'],
          },
          animation: {
            'float': 'float 6s ease-in-out infinite',
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            }
          }
        }
      }
    }
  }
})
