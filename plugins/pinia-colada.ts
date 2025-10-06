import { PiniaColada } from '@pinia/colada';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PiniaColada);
});
