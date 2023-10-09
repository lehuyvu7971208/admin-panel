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

// Types
import type { App } from 'vue';

export function registerPlugins (app: App) {
  app
    .use(pinia)
    .use(i18n)
    .use(vuetify)
    .use(router);
}
