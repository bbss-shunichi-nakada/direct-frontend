// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // 環境変数から読み込み
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
    },
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt'],

  css: ['~/assets/css/tailwind.css', '~/assets/css/components.css'],
});
