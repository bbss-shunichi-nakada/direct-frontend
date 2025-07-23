// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt'],

  css: [
    '~/assets/css/tailwind.css', // OK
    '~/assets/css/components.css', // OK
  ],
});
