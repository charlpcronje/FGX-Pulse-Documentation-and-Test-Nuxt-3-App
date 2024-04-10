// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/github-markdown.css',
  ],
  runtimeConfig: {
    // The private keys which are only available within server-side
    email: process.env.AUTH_EMAIL,
    password: process.env.AUTH_PASSWORD,
    // Keys within public, will be also exposed to the client-side
    public: {
      apiUrl: process.env.API_URL,
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],
  colorMode: {
    preference: 'dark'
  },
  content: {
    documentDriven: true,
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
    watch: false
  }
});

