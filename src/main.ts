/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Utilities
import 'reflect-metadata';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// Styles
import '@/scss/style.scss';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
