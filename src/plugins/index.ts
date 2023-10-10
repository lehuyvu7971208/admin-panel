/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import i18n from './i18n';
import pinia from './pinia';
import router from '../router';
import vuetify from './vuetify';

// External plugins
import vueScrollTo from 'vue-scrollto';
import vueTablerIcons from 'vue-tabler-icons';
import perfectScrollbar from 'vue3-perfect-scrollbar';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(vueScrollTo, {
    duration: 1000,
    easing: "ease"
  });

  app
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .use(vueTablerIcons)
    .use(perfectScrollbar);
}
