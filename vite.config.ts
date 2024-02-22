// Plugins
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      // styles: { configFile: "src/scss/variables.scss" },
    }),

    federation({
      name: "admin-panel",
      remotes: {
        frontend: "http://localhost:8000/assets/remoteEntry.js",
      },
      shared: ["vue", "pinia", "vuetify", "vue-router", "vee-validate"],
    }),
  ],

  define: { "process.env": {} },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 8080,
  },

  envPrefix: "PUBLIC",

  optimizeDeps: {
    exclude: ["vuetify"],
    entries: ["./src/**/*.vue"],
  },
});
