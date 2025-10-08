// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error - Vite config types don't include plugins array
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      devSourcemap: false,
    },
    optimizeDeps: {
      include: ['@pinia/colada'],
    },
  },

  css: [
    '@mdi/font/css/materialdesignicons.css',
    '~/src/shared/ui/styles/index.scss',
    '~/assets/css/vuetify-overrides.scss',
  ],
});
