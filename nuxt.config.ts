// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // 環境変数から読み込み
  runtimeConfig: {
    public: {
      apiBaseUrl: 'default-api-url',
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
