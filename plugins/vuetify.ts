import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
  });
  app.vueApp.use(vuetify);
});
